package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Title         string `json:"title"`
	MongoId       string `json:"mongo_id"`
	CoverPhoto    string `json:"cover_photo"`
	Description   string `json:"description"`
	YearOfIssue   int    `json:"year_of_issue"`
	AgeRatingId   int    `json:"age_rating_id"`
	ProductTypeId int    `json:"product_type_id"`

	Comments    []Comment    `json:"comments"`
	Discussions []Discussion `json:"discussions"`

	Authors []Author `gorm:"many2many:product_authors;" json:"authors"`
	Genres  []Genre  `gorm:"many2many:product_genres;" json:"genres"`
}
