package test

import (
	"api/app/actions"
	"code.sajari.com/docconv/v2"
	"fmt"
)

func Test() {
	r, err := docconv.ConvertPath("cmd/test/source.pdf")
	docconv.
	actions.IfLogFatal(err)
	fmt.Println(r.Meta)
}