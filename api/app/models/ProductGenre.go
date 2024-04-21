package models

import "gorm.io/gorm"

type ProductGenre struct {
	gorm.Model
	Id        int
	GenreId   int
	ProductId int
}
