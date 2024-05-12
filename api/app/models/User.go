package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Login       string `json:"login"`
	Nickname    string `json:"nickname"`
	Email       string `json:"email"`
	YearOfBirth int    `json:"year_of_birth"`
	Password    string `json:"-"`
	RoleId      int    `json:"role_id"`
	Description string `json:"description"`
	Photo       string `json:"photo"`
}
