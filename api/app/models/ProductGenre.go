package models

import "gorm.io/gorm"

type ProductGenre struct {
	gorm.Model
	GenreId   int
	ProductId int
}
