package actions

import (
	"io"
	"log"
	"net/http"
	"reflect"
	"strconv"
	"strings"
)

func ReadRequestBody(r *http.Request) []byte {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}
	return body
}

func ReadFormDataBody(r *http.Request, varType interface{}) {

	numObj := reflect.ValueOf(varType)

	if numObj.Kind() == reflect.Ptr {
		log.Println("pointer before ", varType)
		numObj = reflect.Indirect(numObj)
		log.Println("pointer after ", numObj)
		log.Println("pointer ", varType)
	}

	//var form map[string]string

	gen := numObj.Type()
	valObj := reflect.ValueOf(varType).Elem()

	log.Println("type ", valObj.NumField())

	for i := 0; i < gen.NumField(); i++ {
		tag := gen.Field(i).Tag.Get("form")
		val := r.FormValue(tag)

		switch valObj.Field(i).Kind() {
		case reflect.String:
			valObj.Field(i).SetString(val)
			break
		case reflect.Int:
			num, _ := strconv.Atoi(val)
			valObj.Field(i).SetInt(int64(num))
			break
		case reflect.Slice:
			arr := strings.Split(val, ",")
			var tmpArr []int

			for i := 0; i < len(arr); i++ {
				num, _ := strconv.Atoi(arr[i])
				tmpArr = append(tmpArr, num)
			}
			slice := reflect.ValueOf(tmpArr)
			valObj.Field(i).Set(slice)

		}

	}

	varType = valObj.Type()

	return
}
