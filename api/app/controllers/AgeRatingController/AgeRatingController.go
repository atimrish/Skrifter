package AgeRatingController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"gorm.io/gorm"
	"net/http"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	var data []models.AgeRating

	db.Find(&data)

	err :=json.NewEncoder(w).Encode(data)
	actions.IfLogFatal(err)
	w.Header().Set("Content-Type", "application/json")
	return
}
