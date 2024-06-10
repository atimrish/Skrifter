package FavoriteController

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm/clause"
	"net/http"
	"strconv"
)

func AddToFavorite(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)
	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	var favorite models.Favorite
	ctx := db.First(&favorite, "product_id = ? AND user_id = ?", id, payload.UserId)

	type AddToFavoriteRequest struct {
		StatusId int `json:"status_id"`
	}

	body := actions.ReadRequestBody(r)

	var req AddToFavoriteRequest
	err = json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	if ctx.RowsAffected > 0 {
		favorite.FavoriteStatusId = req.StatusId
		db.Save(&favorite)
	} else {
		productId, err := strconv.Atoi(id)
		actions.IfLogFatal(err)
		favorite.FavoriteStatusId = req.StatusId
		favorite.UserId = int(payload.UserId)
		favorite.ProductId = productId
		db.Create(&favorite)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "добавлено в избранное",
	})
}

func GetByToken(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	defer actions.CloseDb(db)

	cookie, err := r.Cookie("access_token")
	actions.IfLogFatal(err)

	payload, err := actions.GetPayloadJWT(cookie.Value)
	actions.IfLogFatal(err)

	var favorites []models.Favorite

	db.Model(&models.Favorite{}).
		Preload(clause.Associations).
		Preload("Product.Authors").
		Find(&favorites, "user_id = ?", payload.UserId)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(favorites)
}
