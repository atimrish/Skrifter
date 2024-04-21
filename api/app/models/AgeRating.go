package models

import "gorm.io/gorm"

type AgeRating struct {
	gorm.Model
	Id   int
	Name string
}
