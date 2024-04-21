package models

import "gorm.io/gorm"

type FavoriteStatus struct {
	gorm.Model
	Id   int
	Name string
}
