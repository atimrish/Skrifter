package routes

import (
	"api/app/controllers/Auth"
	"api/app/controllers/GenreController"
	"api/app/controllers/Role"
	"api/app/controllers/UserController"
	"api/app/middleware"
	"github.com/go-chi/chi/v5"
)

func InitRouter() *chi.Mux {
	r := chi.NewRouter()
	initRoutes(r)
	return r
}

func initRoutes(r *chi.Mux) {

	///TODO продукт
	///TODO автор

	///TODO роли
	r.Get("/roles", Role.GetRoles)
	r.Post("/roles", Role.AddRole)


	r.Group(func(r chi.Router) {
		r.Use(middleware.Authorised)
		r.Post("/logout", Auth.Logout)

		///TODO действия с аккаунтом пользователя
		r.Put("/users/update-photo", UserController.UpdatePhoto)
		r.Put("/users/update-description", UserController.UpdateDescription)
		r.Get("/users/me", UserController.GetUserInfoByToken)
	})

	r.Post("/login", Auth.Login)
	r.Post("/register", Auth.Register)
	r.Post("/refresh-token", Auth.RefreshToken)


	//TODO информация о пользлвателе
	r.Get("/users/{id}", UserController.GetUserInfo)

	r.Get("/genres", GenreController.GetAll)
	r.Get("/genres/{id}", GenreController.GetById)
}
