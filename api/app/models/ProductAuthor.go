package models

import "gorm.io/gorm"

type ProductAuthor struct {
	gorm.Model
	AuthorId  int
	ProductId int
}
