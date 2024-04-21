package models

import "gorm.io/gorm"

type ProductType struct {
	gorm.Model
	Id   int
	Name string
}
