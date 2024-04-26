package models

import "gorm.io/gorm"

type FavoriteStatus struct {
	gorm.Model
	Name string
}
