package models

import "gorm.io/gorm"

type Favorite struct {
	gorm.Model
	UserId           int `json:"user_id"`
	ProductId        int `json:"product_id"`
	FavoriteStatusId int `json:"favorite_status_id"`

	Product Product `json:"product"`
}
