package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Login       string
	Nickname    string
	Email       string
	YearOfBirth int
	Password    string `json:"-"`
	RoleId      int
	Description string
	Photo       string
}
