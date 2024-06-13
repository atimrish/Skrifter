package CommentController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
	"strconv"
)

func GetAll(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	var comments []models.Comment

	db.Find(&comments)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
	return
}

func GetByProductId(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	var comments []models.Comment
	db.Model(&models.Comment{}).
	Preload("User").
	Find(&comments, "product_id = ?", id)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(comments)
}

func Add(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	type AddCommentRequest struct {
		Text string `json:"text"`
	}

	body := actions.ReadRequestBody(r)

	var req AddCommentRequest
	err := json.Unmarshal(body, &req)
	if err != nil {
		actions.UnprocessableContent(w)
		return
	}

	cookie, _ := r.Cookie("access_token")
	payload, _ := actions.GetPayloadJWT(cookie.Value)

	productId, err := strconv.Atoi(id)
	actions.IfLogFatal(err)

	var comment models.Comment
	comment.UserId = int(payload.UserId)
	comment.Text = req.Text
	comment.ProductId = productId
	
	db.Create(&comment)

	w.WriteHeader(201)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "комментарий добавлен",
		"status": "true",
	})
}

func Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)
	db.Delete(models.Comment{}, id)
	w.WriteHeader(204)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "коммент удален",
	})
}
