package actions

import (
	"encoding/json"
	"net/http"
)

func UnprocessableContent(w http.ResponseWriter) {
	w.WriteHeader(422)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "неверный формат передаваемых данных",
	})
}
