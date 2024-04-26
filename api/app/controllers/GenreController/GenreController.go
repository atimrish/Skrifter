package GenreController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func GetAll(w http.ResponseWriter, r *http.Request)  {
	db := actions.GetDb()
	var genres []models.Genre
	db.Find(&genres)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(genres)
}

func GetById(w http.ResponseWriter, r *http.Request)  {
	id := chi.URLParam(r, "id")
	db := actions.GetDb()
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
