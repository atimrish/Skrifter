package GenreController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
	"net/http"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var genres []models.Genre
	db.Find(&genres)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(genres)
}

func GetById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var genre models.Genre
	res := db.Find(&genre, "id = ?", id)

	if res.RowsAffected < 1 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "ничего не найдено",
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(genre)
}

func Create(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	var genre models.Genre
	body := actions.ReadRequestBody(r)

	type AddGenreRequest struct {
		Name string `json:"name"`
	}

	var req AddGenreRequest
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	genre.Name = req.Name
	db.Create(&genre)

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "жанр создан",
	})
}
