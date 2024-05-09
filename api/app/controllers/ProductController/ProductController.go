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

	var product models.Product
	product.Title = req.Title
	product.Description = req.Description
	product.YearOfIssue = req.YearOfIssue
	product.AgeRatingId = req.AgeRatingId

	switch req.ProductTypeId {
	case BOOK:
		///TODO
		break
	case COMICS:
		///TODO
		break;
	case MANGA:
		///TODO
		break
	case AUDIO:
		///TODO
		break
	case PODCAST:
		///TODO:
		break
	}



}
