package models

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	Id        int
	UserId    int
	ProductId int
	Value     int
}
