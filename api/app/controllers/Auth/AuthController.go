package Auth

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	JWT "github.com/golang-jwt/jwt/v5"
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
	res := db.Take(&user, "login = ?", req.Login)

	w.Header().Set("Content-Type", "application/json")
	if (res.RowsAffected < 1) || (!actions.CheckPassword(req.Password, user.Password)) {

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
		IsAdmin:       false,
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
		IsAdmin:       false,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expRefresh,
		},
	}

	cookie := http.Cookie{
		Name:       "access_token",
		Value:      accessToken,
		Path:       "/",
		Domain:     "/",
		Expires:    time.Now().Add(time.Minute * 15),
		RawExpires: "",
		MaxAge:     0,
		Secure:     true,
		HttpOnly:   true,
	}

	r.AddCookie(&cookie)
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
	actions.IfLogFatal(err)

	var user = models.User{
		Login:       req.Login,
		Nickname:    req.Nickname,
		Email:       req.Email,
		YearOfBirth: req.YearOfBirth,
		Password:    actions.HashPassword(req.Password),
		RoleId:      1,
	}

	db := actions.GetDb()
	db.Create(&user)

	tokenIdentity := rand.Int()

	expAccess := JWT.NumericDate{
		time.Now().Add(time.Minute * 15),
	}

	payload := actions.CustomClaims{
		UserId:        user.ID,
		TokenIdentity: tokenIdentity,
		IsAdmin:       false,
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
		IsAdmin:       false,
		RegisteredClaims: JWT.RegisteredClaims{
			ExpiresAt: &expRefresh,
		},
	}

	cookie := http.Cookie{
		Name:       "access_token",
		Value:      accessToken,
		Path:       "/",
		Domain:     "/",
		Expires:    time.Now().Add(time.Minute * 15),
		RawExpires: "",
		MaxAge:     900,
		Secure:     true,
		HttpOnly:   true,
	}

	r.AddCookie(&cookie)
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
		Domain:   "/",
		MaxAge:   -1,
		Secure:   true,
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(map[string]string{
		"message": "вы вышли",
	})

	actions.IfLogFatal(err)
}
