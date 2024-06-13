package AuthorController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
	"net/http"
	"path/filepath"
	"strconv"
	"time"
)

type AuthorRequest struct {
	Surname     string `form:"surname"`
	Name        string `form:"name"`
	Patronymic  string `form:"patronymic"`
	Nickname    string `form:"nickname"`
	YearOfBirth int    `form:"year_of_birth"`
}

func AddAuthor(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(32 << 20)
	actions.IfLogFatal(err)

	var req AuthorRequest
	actions.ReadFormDataBody(r, &req)

	file, header, err := r.FormFile("photo")
	actions.IfLogFatal(err)
	filename := strconv.FormatInt(time.Now().Unix(), 10) + filepath.Ext(header.Filename)
	path := "author/" + filename
	actions.AddToStorage(file, path, filename, "add-file")

	var author models.Author
	author.Photo = path
	author.Nickname = req.Nickname
	author.Surname = req.Surname
	author.Name = req.Name
	author.Patronymic = req.Patronymic
	author.YearOfBirth = req.YearOfBirth

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	db.Create(&author)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "автор создан",
	})
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	return
}

func GetAll(w http.ResponseWriter, r *http.Request)  {
	var authors []models.Author

	db := actions.GetDb()
	defer actions.CloseDb(db)

	db.Find(&authors)

	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(authors)
	actions.IfLogFatal(err)
	return
}

func GetById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var author models.Author
	db := actions.GetDb()
	defer actions.CloseDb(db)

	db.Model(&models.Author{}).
		Preload("Products").
		Find(&author, "id = ?", id)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(author)
}
