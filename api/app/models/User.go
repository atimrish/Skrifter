package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Id          int
	Login       string
	Nickname    string
	Email       string
	YearOfBirth int
	Password    string
	RoleId      int
	Photo       string
}
