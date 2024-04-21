package models

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	Id   int
	Name string
}
