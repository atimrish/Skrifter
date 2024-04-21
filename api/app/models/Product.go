package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Id            int
	MongoId       string
	CoverPhoto    string
	Description   string
	YearOfIssue   int
	AgeRatingId   int
	ProductTypeId int
}
