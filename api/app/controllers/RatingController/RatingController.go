package RatingController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
	"strconv"
)

func AddRating(w http.ResponseWriter, r *http.Request) {
	type AddRatingRequest struct {
		Value int `json:"value"`
	}

	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	var rating models.Rating

	cookie, _ := r.Cookie("access_token")
	payload, _ := actions.GetPayloadJWT(cookie.Value)

	productId, err := strconv.Atoi(id)
	actions.IfLogFatal(err)

	var req AddRatingRequest

	body := actions.ReadRequestBody(r)
	err = json.Unmarshal(body, &req)

	res := db.Find(&rating, "product_id = ? AND user_id = ?", productId, payload.UserId)
	if res.RowsAffected > 0 {
		rating.Value = req.Value
		db.Save(&rating)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "оценка изменена",
		})
		return
	}

	rating.UserId = int(payload.UserId)
	rating.ProductId = productId
	rating.Value = req.Value

	db.Create(&rating)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "оценка добавлена",
	})
}
