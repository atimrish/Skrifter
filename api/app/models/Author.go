package models

import "gorm.io/gorm"

type Author struct {
	gorm.Model
	Id          int
	Surname     string
	Name        string
	Patronymic  string
	Nickname    string
	YearOfBirth int
	Photo       string
}
