package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	ProductId int    `json:"product_id"`
	UserId    int    `json:"user_id"`
	Text      string `json:"text"`

	User User `json:"user"`
}
