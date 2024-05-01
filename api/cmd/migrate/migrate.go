package migrate

import (
	"api/app/actions"
	"api/app/models"
	"fmt"
	_ "github.com/lib/pq"
	"gorm.io/gorm"
)

/*

roles
users
authors
product_types
age_rating
products
product_authors
rating
comments
comment_replies
discussions
discussion_replies
genres
product_genres
favorite_statuses
favorites

*/

func Up() {
	db := actions.GetDb()
	err := db.AutoMigrate(
		&models.Role{},
		&models.User{},
		&models.Author{},
		&models.ProductType{},
		&models.AgeRating{},
		&models.Product{},
		&models.ProductAuthor{},
		&models.Rating{},
		&models.Comment{},
		&models.CommentReply{},
		&models.Discussion{},
		&models.DiscussionReply{},
		&models.Genre{},
		&models.ProductGenre{},
		&models.FavoriteStatus{},
		&models.Favorite{},
	)

	defer func(db *gorm.DB) {
		sqlDb, _ := db.DB()
		sqlDb.Close()
	}(db)

	actions.IfLogFatal(err)

	fmt.Println("migrated successfully")

}

func Down() {

}
