package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Id        int
	ProductId int
	UserId    int
	Text      string
}
