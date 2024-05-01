package ext_product_data

import (
	"api/app/actions"
	"api/config"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var conf = config.InitConfig()

const tableName = "book_ext"

type Book struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	ReadTime string             `json:"read_time,omitempty" bson:"read_time"`
	Source   string             `json:"source,omitempty" bson:"source"`
}

func (b *Book) AddBookExt() {
	client, context := actions.MongoConnection()

	res, err := client.Database(conf.Mongo.Db).Collection(tableName).InsertOne(context, b)
	actions.IfLogFatal(err)
	b.ID = res.InsertedID.(primitive.ObjectID)
}
