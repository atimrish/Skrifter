package FavoriteStatusesController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"net/http"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	var Statuses []models.FavoriteStatus

	db.Find(&Statuses)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Statuses)
	return
}
