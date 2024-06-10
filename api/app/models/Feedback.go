package models

import "gorm.io/gorm"

type Feedback struct {
	gorm.Model
	Description string `gorm:"type:text;" json:"description"`
}
