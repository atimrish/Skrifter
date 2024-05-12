package models

import "gorm.io/gorm"

type ProductAuthor struct {
	gorm.Model
	AuthorId  int `json:"author_id"`
	ProductId int `json:"product_id"`

	Author  Author  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Product Product `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
