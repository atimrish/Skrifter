package models

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	UserId    int
	ProductId int
	Value     int
}
