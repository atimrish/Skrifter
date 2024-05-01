package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Title         string
	MongoId       string
	CoverPhoto    string
	Description   string
	YearOfIssue   int
	AgeRatingId   int
	ProductTypeId int
}
