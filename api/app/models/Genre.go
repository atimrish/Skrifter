package models

import "gorm.io/gorm"

type Genre struct {
	gorm.Model
	Id   int
	Name string
}
