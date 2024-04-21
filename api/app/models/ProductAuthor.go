package models

import "gorm.io/gorm"

type ProductAuthor struct {
	gorm.Model
	Id        int
	AuthorId  int
	ProductId int
}
