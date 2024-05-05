package test

import (
	"log"
	"reflect"
)

func Test()  {

	type Test struct {
		A string `form:"a_tag"`
		B int `form:"b_tag"`
	}

	var test = new(Test)

	tags := reflect.TypeOf(*test)

	for i := 0; i < tags.NumField(); i++ {
		log.Println(tags.Field(i).Tag.Get("form"))
	}

	obj := reflect.ValueOf(test).Elem()

	for i := 0; i < obj.NumField(); i++ {
		field := obj.Field(i)

		switch field.Type().String() {
		case "string":
			field.SetString("test")
			break
		case "int":
			field.SetInt(123)
			break
		}
	}

	log.Println(obj)

}