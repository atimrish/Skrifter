package ProductController

import (
	"api/app/actions"
	"api/app/models"
	"gorm.io/gorm"
	"net/http"
)

const (
	BOOK    = 1
	COMICS  = 2
	MANGA   = 3
	AUDIO   = 4
	PODCAST = 5
)

type AddProductRequest = struct {
	Title         string                `form:"title"`
	Description   string                `form:"description"`
	YearOfIssue   int                   `form:"year_of_issue"`
	AgeRatingId   int                   `form:"age_rating_id"`
	ProductTypeId int                   `form:"product_type_id"`
	Authors       []int                 `form:"authors"`
	Genres        []int                 `form:"genres"`
}

func AddProduct(w http.ResponseWriter, r *http.Request) {
	//обложка и доп данные отдельно

	err := r.ParseMultipartForm(32 << 20)
	actions.IfLogFatal(err)

	var req AddProductRequest

	actions.ReadFormDataBody(r, &req)

	db := actions.GetDb()

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)



	product := models.Product{
		Title:         req.Title,
		CoverPhoto:    "",
		Description:   "",
		YearOfIssue:   0,
		AgeRatingId:   0,
		ProductTypeId: 0,
	}

}
