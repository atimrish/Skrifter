package routes

import (
	"api/app/controllers/Auth"
	"api/app/controllers/Role"
	"api/app/middleware"
	"github.com/go-chi/chi/v5"
)

func InitRouter() *chi.Mux {
	r := chi.NewRouter()
	initRoutes(r)
	return r
}

func initRoutes(r *chi.Mux) {
	///TODO авторизация
	///TODO регистрация
	///TODO выход

	///TODO продукт
	///TODO автор

	///TODO роли
	r.Get("/roles", Role.GetRoles)
	r.Post("/roles", Role.AddRole)

	r.Group(func(r chi.Router) {
		r.Use(middleware.Authorised)
		r.Post("/logout", Auth.Logout)

	})

	r.Post("/login", Auth.Login)
	r.Post("/register", Auth.Register)
}
