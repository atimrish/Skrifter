package models

import "gorm.io/gorm"

type Discussion struct {
	gorm.Model
	ProductId int
	UserId    int
	Text      string
}
