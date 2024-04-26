package seeder

import (
	"api/app/actions"
	"api/app/models"
	"fmt"
)

func Seed() {
	db := actions.GetDb()

	//возрастной рейтинг
	db.Create(&models.AgeRating{
		Name:  "0+",
	})

	db.Create(&models.AgeRating{
		Name:  "6+",
	})

	db.Create(&models.AgeRating{
		Name:  "12+",
	})

	db.Create(&models.AgeRating{
		Name:  "16+",
	})

	db.Create(&models.AgeRating{
		Name:  "18+",
	})

	//статусы избранных
	db.Create(&models.FavoriteStatus{
		Name:  "Читаю",
	})

	db.Create(&models.FavoriteStatus{
		Name:  "В планах",
	})

	db.Create(&models.FavoriteStatus{
		Name:  "Отложено",
	})

	db.Create(&models.FavoriteStatus{
		Name:  "Прочитано",
	})

	db.Create(&models.FavoriteStatus{
		Name:  "Брошено",
	})

	//роли
	db.Create(&models.Role{
		Name: "Пользователь",
	})

	db.Create(&models.Role{
		Name: "Модератор",
	})

	db.Create(&models.Role{
		Name: "Админ",
	})

	//Жанры
	db.Create(&models.Genre{
		Name: "Комедия",
	})

	db.Create(&models.Genre{
		Name: "Фэнтези",
	})

	db.Create(&models.Genre{
		Name: "Романтика",
	})

	db.Create(&models.Genre{
		Name: "Фантастика",
	})

	db.Create(&models.Genre{
		Name: "Детектив",
	})

	db.Create(&models.Genre{
		Name: "Ужасы",
	})

	db.Create(&models.Genre{
		Name: "Триллеры",
	})

	db.Create(&models.Genre{
		Name: "Приключения",
	})

	db.Create(&models.Genre{
		Name: "Проза",
	})

	db.Create(&models.Genre{
		Name: "Бизнес-литература",
	})

	db.Create(&models.Genre{
		Name: "Психология",
	})

	db.Create(&models.Genre{
		Name: "Исскуство и культура",
	})

	db.Create(&models.Genre{
		Name: "Научная литература",
	})

	db.Create(&models.Genre{
		Name: "Хобби и досуг",
	})

	db.Create(&models.Genre{
		Name: "Изучение языков",
	})

	db.Create(&models.Genre{
		Name: "Компьютерная литература",
	})

	db.Create(&models.Genre{
		Name: "История",
	})

	db.Create(&models.Genre{
		Name: "Общество",
	})

	db.Create(&models.Genre{
		Name: "Мемуары",
	})

	db.Create(&models.Genre{
		Name: "Красота и здоровье",
	})

	db.Create(&models.Genre{
		Name: "Публицистика",
	})

	//Типы продуктов
	db.Create(&models.ProductType{
		Name: "Книга",
	})

	db.Create(&models.ProductType{
		Name: "Комикс",
	})

	db.Create(&models.ProductType{
		Name: "Манга",
	})

	db.Create(&models.ProductType{
		Name: "Аудиокнига",
	})

	db.Create(&models.ProductType{
		Name: "Подкаст",
	})

	fmt.Println("seeded successfully")
}
