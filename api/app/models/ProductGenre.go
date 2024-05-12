package models

import "gorm.io/gorm"

type ProductGenre struct {
	gorm.Model
	GenreId   int
	ProductId int

	Genre Genre  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Product Product `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
