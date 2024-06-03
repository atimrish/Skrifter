package models

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	UserId     int `json:"user_id"`
	ProductId  int `json:"product_id"`
	Value      int `json:"value"`
}
