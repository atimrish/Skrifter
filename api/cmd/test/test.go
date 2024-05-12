package test

import (
	"api/app/actions"
	"code.sajari.com/docconv/v2"
	"log"
)

func Test() {
	res, err := docconv.ConvertPath("./cmd/test/pdf-test.pdf")
	actions.IfLogFatal(err)
	
	log.Println(res.Body)
}