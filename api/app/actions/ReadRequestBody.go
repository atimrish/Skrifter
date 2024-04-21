package actions

import (
	"io"
	"log"
	"net/http"
)

func ReadRequestBody(r *http.Request) []byte {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	return body
}
