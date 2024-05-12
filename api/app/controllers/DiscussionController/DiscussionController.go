package DiscussionController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
	"strconv"
)

func GetByProductId(w http.ResponseWriter, r *http.Request)  {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	var discussion []models.Discussion
	db.Model(&models.Discussion{}).
		Preload("User").
		Preload("Replies").
		Find(&discussion, "product_id = ?", id)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(discussion)
}

func Add(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	type AddDiscussionRequest struct {
		Text string `json:"text"`
	}

	body := actions.ReadRequestBody(r)

	var req AddDiscussionRequest
	err := json.Unmarshal(body, &req)
	if err != nil {
		actions.UnprocessableContent(w)
		return
	}

	cookie, _ := r.Cookie("access_token")
	payload, _ := actions.GetPayloadJWT(cookie.Value)

	productId, err := strconv.Atoi(id)
	actions.IfLogFatal(err)

	var discussion models.Discussion
	discussion.UserId = int(payload.UserId)
	discussion.Text = req.Text
	discussion.ProductId = productId

	db.Create(&discussion)

	w.WriteHeader(201)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "обсуждение создано",
		"status": "true",
	})
}
