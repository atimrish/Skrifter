package models

import "gorm.io/gorm"

type Favorite struct {
	gorm.Model
	UserId           int
	ProductId        int
	FavoriteStatusId int
}
