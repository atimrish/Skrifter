package Auth

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"fmt"
	JWT "github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func Login(w http.ResponseWriter, r *http.Request) {
	type LoginRequest struct {
		Login    string `json:"login"`
		Password string `json:"password"`
	}

	body := actions.ReadRequestBody(r)

	var req LoginRequest
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	var user models.User
	db := actions.GetDb()
	defer actions.CloseDb(db)

	res := db.Take(&user, "login = ?", req.Login)

	w.Header().Set("Content-Type", "application/json")
	if (res.RowsAffected < 1) || (!actions.CheckPassword(req.Password, user.Password)) {

		w.WriteHeader(422)
		err = json.NewEncoder(w).Encode(map[string]string{
			"message": "error",
		})
		actions.IfLogFatal(err)
		return
	}

	tokenIdentity := rand.Int()

	expAccess := JWT.NumericDate{
		time.Now().Add(time.Minute * 15),
	}

	payload := actions.CustomClaims{
		UserId:        user.ID,
		TokenIdentity: tokenIdentity,
		RoleId:        user.RoleId,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expAccess,
		},
	}

	accessToken := actions.MakeJWT(payload)

	expRefresh := JWT.NumericDate{
		time.Now().Add(time.Hour * 48),
	}

	payload = actions.CustomClaims{
		UserId:        user.ID,
		TokenIdentity: tokenIdentity,
		RoleId:        user.RoleId,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expRefresh,
		},
	}

	cookie := http.Cookie{
		Name:       "access_token",
		Value:      accessToken,
		Path:       "/",
		Expires:    time.Now().Add(time.Hour * 2),
		RawExpires: "",
		MaxAge:     0,
		Secure:     false,
		HttpOnly:   true,
	}

	http.SetCookie(w, &cookie)

	refreshToken := actions.MakeJWT(payload)

	err = json.NewEncoder(w).Encode(map[string]string{
		"refresh_token": refreshToken,
	})
	actions.IfLogFatal(err)
}

func Register(w http.ResponseWriter, r *http.Request) {

	type RegisterRequest struct {
		Login                string `json:"login"`
		Nickname             string `json:"nickname"`
		Email                string `json:"email"`
		YearOfBirth          int    `json:"year_of_birth"`
		Password             string `json:"password"`
		PasswordConfirmation string `json:"password_confirmation"`
	}

	body := actions.ReadRequestBody(r)

	var req RegisterRequest
	err := json.Unmarshal(body, &req)
	if err != nil {
		actions.UnprocessableContent(w)
		return
	}

	var user = models.User{
		Login:       req.Login,
		Nickname:    req.Nickname,
		Email:       req.Email,
		YearOfBirth: req.YearOfBirth,
		Password:    actions.HashPassword(req.Password),
		RoleId:      1,
	}

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	db.Create(&user)

	tokenIdentity := rand.Int()

	expAccess := JWT.NumericDate{
		time.Now().Add(time.Minute * 15),
	}

	payload := actions.CustomClaims{
		UserId:        user.ID,
		TokenIdentity: tokenIdentity,
		RoleId:        1,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expAccess,
		},
	}

	accessToken := actions.MakeJWT(payload)

	expRefresh := JWT.NumericDate{
		time.Now().Add(time.Hour * 48),
	}

	payload = actions.CustomClaims{
		UserId:        user.ID,
		TokenIdentity: tokenIdentity,
		RoleId:        1,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expRefresh,
		},
	}

	cookie := http.Cookie{
		Name:       "access_token",
		Value:      accessToken,
		Path:       "/",
		Expires:    time.Now().Add(time.Hour * 2),
		RawExpires: "",
		MaxAge:     900,
		Secure:     false,
		HttpOnly:   true,
	}

	http.SetCookie(w, &cookie)
	refreshToken := actions.MakeJWT(payload)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"refresh_token": refreshToken,
	})

	actions.IfLogFatal(err)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "access_token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Secure:   false,
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(map[string]string{
		"message": "вы вышли",
	})

	actions.IfLogFatal(err)
}

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("access_token")
	if err != nil {
		actions.UnprocessableContent(w)
		return
	}

	type RefreshTokenRequest struct {
		RefreshToken string `json:"refresh_token"`
	}

	body := actions.ReadRequestBody(r)
	var req RefreshTokenRequest
	err = json.Unmarshal(body, &req)
	actions.IfLogFatal(err)
	accessToken, refreshToken := actions.RefreshToken(cookie.Value, req.RefreshToken)

	newCookie := http.Cookie{
		Name:       "access_token",
		Value:      accessToken,
		Path:       "/",
		Expires:    time.Now().Add(time.Hour * 2),
		RawExpires: "",
		MaxAge:     900,
		Secure:     false,
		HttpOnly:   true,
	}

	http.SetCookie(w, &newCookie)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"refresh_token": refreshToken,
	})
}

func CheckUserExists(w http.ResponseWriter, r *http.Request) {

	type CheckUserExistsForm struct {
		Field string `json:"field"`
		Value string `json:"value"`
	}

	body := actions.ReadRequestBody(r)

	var form CheckUserExistsForm

	err := json.Unmarshal(body, &form)
	actions.IfLogFatal(err)

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var user models.User
	query := fmt.Sprintf("%s = '%s'", form.Field, form.Value)
	res := db.Take(&user, query)

	if res.RowsAffected > 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(422)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "поле занято",
		})
		return
	}

	w.WriteHeader(200)
}

func CheckAdmin(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)
	payload, err := actions.GetPayloadJWT(cookie.Value)
	log.Println("test")
	actions.IfLogFatal(err)

	var res bool

	if payload.RoleId == 3 {
		res = true
	} else {
		res = false
	}

	json.NewEncoder(w).Encode(map[string]any{
		"result": res,
	})
}
