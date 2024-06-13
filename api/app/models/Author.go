package models

import "gorm.io/gorm"

type Author struct {
	gorm.Model
	Surname     string `json:"surname,omitempty"`
	Name        string `json:"name,omitempty"`
	Patronymic  string `json:"patronymic,omitempty"`
	Nickname    string `json:"nickname,omitempty"`
	YearOfBirth int    `json:"year_of_birth,omitempty"`
	Photo       string `json:"photo,omitempty"`

	Products []*Product `json:"products" gorm:"many2many:products;"`
}
