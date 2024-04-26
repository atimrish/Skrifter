package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	ProductId int
	UserId    int
	Text      string
}
