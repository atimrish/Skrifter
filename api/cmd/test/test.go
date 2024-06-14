package test

import (
	"api/app/actions"
	"api/app/models"
)

func Test() {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	db.AutoMigrate(&models.Feedback{})
}