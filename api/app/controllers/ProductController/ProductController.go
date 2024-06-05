package ProductController

import (
	"api/app/actions"
	"api/app/models"
	"api/app/models/ext_product_data"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
	"path/filepath"
	"strconv"
	"time"
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
	defer actions.CloseDb(db)

	file, header, err := r.FormFile("cover_photo")
	actions.IfLogFatal(err)

	filename := strconv.FormatInt(time.Now().Unix(), 10) + filepath.Ext(header.Filename)
	path := "product/cover_photos/" + filename
	actions.AddToStorage(file, path, filename, "add-file")

	var product models.Product
	product.Title = req.Title
	product.Description = req.Description
	product.YearOfIssue = req.YearOfIssue
	product.AgeRatingId = req.AgeRatingId
	product.ProductTypeId = req.ProductTypeId
	product.CoverPhoto = filename

	db.Create(&product)

	for _, item := range req.Authors {
		author := models.ProductAuthor{
			AuthorId:  item,
			ProductId: int(product.ID),
		}
		db.Create(&author)
	}

	for _, item := range req.Genres {
		genre := models.ProductGenre{
			GenreId:   item,
			ProductId: int(product.ID),
		}
		db.Create(&genre)
	}

	switch req.ProductTypeId {
	case BOOK:
		product.MongoId = storeBook(r)
		break
	case COMICS:

	case MANGA:

	case AUDIO:

	case PODCAST:

	}

	db.Save(&product)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "продукт создан",
	})
}

func GetAll(w http.ResponseWriter, r *http.Request) {
	var products []models.Product

	queryParams := r.URL.Query()
	db := actions.GetDb()
	defer actions.CloseDb(db)

	productType := ""
	if len(queryParams["type"]) > 0 {
		productType = queryParams["type"][0]
	}

	ctx := db.Model(&models.Product{}).
		Preload("Authors").
		Preload("Genres").
		Preload("Comments").
		Preload("Discussions").
		Preload("Ratings")

	switch productType {
	case "book":
		ctx.Find(&products, "product_type_id = ?", BOOK)
		break
	case "comics":
		ctx.Find(&products, "product_type_id = ?", COMICS)
		break
	case "manga":
		ctx.Find(&products, "product_type_id = ?", MANGA)
		break
	case "audio":
		ctx.Find(&products, "product_type_id = ?", AUDIO)
		break
	case "podcast":
		ctx.Find(&products, "product_type_id = ?", PODCAST)
		break
	default:
		ctx.Find(&products)
		break
	}



	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
	return
}

func GetById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	db := actions.GetDb()
	defer actions.CloseDb(db)

	var product models.Product
	res := db.Model(&models.Product{}).
		Preload("Authors").
		Preload("Genres").
		Preload("Comments").
		Preload("Discussions").
		Preload("Ratings").
		Find(&product, "id = ?", id)

	switch product.ProductTypeId {
	case BOOK:
		var bookExt ext_product_data.Book
		bookExt.Get(product.MongoId)
		product.Ext = bookExt
		break
	case COMICS:
		break
	case MANGA:
		break
	case AUDIO:
		break
	case PODCAST:
		break
	}

	w.Header().Set("Content-Type", "application/json")
	if res.RowsAffected < 1 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "ничего не найдено",
		})
		return
	}

	json.NewEncoder(w).Encode(product)
}

func storeBook(r *http.Request) string {
	type StoreBookRequest struct {
		ReadTime string `form:"read_time"`
	}

	var req StoreBookRequest
	actions.ReadFormDataBody(r, &req)

	file, header, err := r.FormFile("book_file")
	actions.IfLogFatal(err)

	nowString := strconv.FormatInt(time.Now().Unix(), 10)

	filename := "source" + filepath.Ext(header.Filename)
	path := "product/source/" + nowString + "/" + filename
	actions.AddToStorage(file, path, filename, "add-book")

	var bookExt ext_product_data.Book
	bookExt.ReadTime = req.ReadTime
	bookExt.Source = path
	bookExt.AddBookExt()

	return bookExt.ID.Hex()
}