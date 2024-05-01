package test

import (
	"api/app/models/ext_product_data"
	"log"
)

func Test()  {
	var b ext_product_data.Book
	b.ReadTime = "dsd"
	b.Source = "sss"
	b.AddBookExt()
	log.Println(b.ID)
}