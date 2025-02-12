package UserController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strconv"
	"time"
)

func UpdatePhoto(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(32 << 20)
	actions.IfLogFatal(err)

	db := actions.GetDb()
	defer actions.CloseDb(db)

	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	var user models.User
	db.Take(&user, "id = ?", payload.UserId)

	file, header, err := r.FormFile("photo")
	actions.IfLogFatal(err)


	filename := strconv.FormatInt(time.Now().Unix(), 10) + filepath.Ext(header.Filename)

	if user.Photo == "" {
		path := "user/" + filename
		actions.AddToStorage(file, path, filename, "add-file")
		user.Photo = path
	} else {
		newPath := "user/" + filename
		actions.UpdateStoredFile(file, user.Photo, newPath, filename)
		user.Photo = newPath
	}

	db.Save(user)
	defer func(file multipart.File) {
		err := file.Close()
		actions.IfLogFatal(err)
	}(file)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"message": "фото профиля обновлено",
	})

	actions.IfLogFatal(err)
}

func DeletePhoto(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var user models.User
	db.Take(&user, "id = ?", payload.UserId)

	if user.Photo == "" {
		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(map[string]string{
			"message": "нет фото профиля, нечего удалять",
		})
		return
	}

	actions.DeleteFromStorage(user.Photo)
	user.Photo = ""
	db.Save(user)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"message": "фото профиля удалено",
	})

}

func UpdateDescription(w http.ResponseWriter, r *http.Request) {
	type UpdateDescriptionRequest struct {
		Description string `json:"description"`
	}

	body := actions.ReadRequestBody(r)

	var req UpdateDescriptionRequest
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var user models.User
	db.Take(&user, "id = ?", payload.UserId)
	user.Description = req.Description
	db.Save(&user)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"message": "описание профиля обновлено",
	})

	actions.IfLogFatal(err)
}

func GetUserInfo(w http.ResponseWriter, r *http.Request) {
	userId := chi.URLParam(r, "id")

	var user models.User

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	res := db.Take(&user, "id = ?", userId)

	w.Header().Set("Content-Type", "application/json")

	if res.RowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		err := json.NewEncoder(w).Encode(map[string]string{
			"message": "пользователь не найден",
		})
		actions.IfLogFatal(err)
		return
	}

	err := json.NewEncoder(w).Encode(user)
	actions.IfLogFatal(err)
}

func GetUserInfoByToken(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var user models.User
	res := db.Take(&user, "id = ?", payload.UserId)

	w.Header().Set("Content-Type", "application/json")

	if res.RowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		err := json.NewEncoder(w).Encode(map[string]string{
			"message": "пользователь не найден",
		})
		actions.IfLogFatal(err)
		return
	}

	err = json.NewEncoder(w).Encode(user)
	actions.IfLogFatal(err)
}

func UpdateNickname(w http.ResponseWriter, r *http.Request) {
	type UpdateNicknameRequest struct {
		Nickname string `json:"nickname"`
	}

	body := actions.ReadRequestBody(r)

	var req UpdateNicknameRequest
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	db := actions.GetDb()
	defer actions.CloseDb(db)

	var user models.User
	db.Take(&user, "id = ?", payload.UserId)
	user.Nickname = req.Nickname
	db.Save(&user)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"message": "никнейм изменен",
	})

	actions.IfLogFatal(err)
}
