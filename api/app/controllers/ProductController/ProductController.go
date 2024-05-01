package ProductController

import (
	"mime/multipart"
	"net/http"
)

func AddBook(w http.ResponseWriter, r *http.Request) {
	//обложка и доп данные отдельно
	type AddBookRequest = struct {
		Title         string                `json:"title"`
		Description   string                `json:"description"`
		YearOfIssue   int                   `json:"year_of_issue"`
		AgeRatingId   int                   `json:"age_rating_id"`
		ProductTypeId int                   `json:"product_type_id"`
		Authors       []int                 `json:"authors"`
		Genres        []int                 `json:"genres"`
		CoverPhoto    *multipart.FileHeader `json:"cover_photo"`
		ReadTime      string                `json:"read_time"`
		Source        *multipart.FileHeader `json:"source"`
	}

}
