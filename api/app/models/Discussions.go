package models

import "gorm.io/gorm"

type Discussion struct {
	gorm.Model
	Id        int
	ProductId int
	UserId    int
	Text      string
}
