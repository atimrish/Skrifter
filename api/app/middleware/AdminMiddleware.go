package middleware

import (
	"api/app/actions"
	"encoding/json"
	"net/http"
)

func Admin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		cookie, _ := r.Cookie("access_token")
		payload, _ := actions.GetPayloadJWT(cookie.Value)

		if payload.RoleId != 3 {
			forbidden(w)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func forbidden(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusForbidden)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "действие запрещено",
	})
	return
}
