package middleware

import (
	"api/app/actions"
	"encoding/json"
	"net/http"
)

func Authorised(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie("access_token")
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			err = json.NewEncoder(w).Encode(map[string]string{
				"message": "не авторизован",
			})
			return
		}

		_, err = actions.GetPayloadJWT(cookie.Value)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			err = json.NewEncoder(w).Encode(map[string]string{
				"message": "не авторизован",
			})
			return
		}

		next.ServeHTTP(w, r)
	})
}
