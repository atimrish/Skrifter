package routes

import (
	"api/app/controllers/AgeRatingController"
	"api/app/controllers/Auth"
	"api/app/controllers/AuthorController"
	"api/app/controllers/CommentController"
	"api/app/controllers/DiscussionController"
	"api/app/controllers/FavoriteStatusesController"
	"api/app/controllers/GenreController"
	"api/app/controllers/ProductController"
	"api/app/controllers/ProductTypeController"
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
		r.Put("/users/update-nickname", UserController.UpdateNickname)
		r.Get("/users/me", UserController.GetUserInfoByToken)
		r.Delete("/users/delete-photo", UserController.DeletePhoto)

		r.Post("/product/{id}/comment", CommentController.Add)
		r.Post("/product/{id}/discussion", DiscussionController.Add)
		r.Post("/check-admin", Auth.CheckAdmin)
	})

	r.Post("/login", Auth.Login)
	r.Post("/register", Auth.Register)
	r.Post("/refresh-token", Auth.RefreshToken)


	//TODO информация о пользлвателе
	r.Get("/users/{id}", UserController.GetUserInfo)

	r.Post("/users/check-exists", Auth.CheckUserExists)

	///TODO жанры
	r.Get("/genres", GenreController.GetAll)
	r.Get("/genres/{id}", GenreController.GetById)

	///TODO возрастной рейтинг
	r.Get("/age-rating", AgeRatingController.GetAll)

	///TODO типы продукта
	r.Get("/product-type", ProductTypeController.GetAll)

	///TODO продукт

	r.Group(func(r chi.Router) {
		r.Use(middleware.Authorised)
		r.Use(middleware.Admin)
		r.Post("/product", ProductController.AddProduct)

		r.Post("/author", AuthorController.AddAuthor)

	})

	r.Get("/author", AuthorController.GetAll)

	r.Get("/product", ProductController.GetAll)
	r.Get("/product/{id}", ProductController.GetById)

	r.Get("/comment", CommentController.GetAll)
	r.Get("/product/{id}/comment", CommentController.GetByProductId)

	r.Get("/product/{id}/discussion", DiscussionController.GetByProductId)

	///
	r.Get("/favorite-statuses", FavoriteStatusesController.GetAll)
}
