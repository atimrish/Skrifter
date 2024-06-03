package ext_product_data

import (
	"api/app/actions"
	"api/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
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

func (b *Book) Get(objId string)  {
	client, context := actions.MongoConnection()

	log.Println("obj_id: " + objId)

	id, err := primitive.ObjectIDFromHex(objId)
	actions.IfLogFatal(err)

	filter := bson.D{{
		"_id", id,
	}}

	res := client.Database(conf.Mongo.Db).Collection(tableName).FindOne(context, filter)
	err = res.Decode(b)
	actions.IfLogFatal(err)
}