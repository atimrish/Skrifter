package models

import "gorm.io/gorm"

type Favorite struct {
	gorm.Model
	Id               int
	UserId           int
	ProductId        int
	FavoriteStatusId int
}
