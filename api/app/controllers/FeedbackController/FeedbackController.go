package FeedbackController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"net/http"
)

func Add(w http.ResponseWriter, r *http.Request) {
	type AddRequest struct {
		Description string `json:"description"`
	}

	var req AddRequest
	body := actions.ReadRequestBody(r)
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	var feedback models.Feedback
	feedback.Description = req.Description

	db := actions.GetDb()
	defer actions.CloseDb(db)

	db.Create(&feedback)

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "обращение отправлено",
	})
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	var feedbacks []models.Feedback
	db.Find(&feedbacks)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feedbacks)
}