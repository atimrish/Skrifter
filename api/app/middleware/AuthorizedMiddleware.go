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
			unauthorizedResponse(w)
			return
		}

		_, err = actions.GetPayloadJWT(cookie.Value)
		if err != nil {
			unauthorizedResponse(w)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func unauthorizedResponse(w http.ResponseWriter) {
	w.WriteHeader(403)
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(map[string]string{
		"message": "не авторизован",
	})
	actions.IfLogFatal(err)
}
