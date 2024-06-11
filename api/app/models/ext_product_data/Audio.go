package ext_product_data

import (
	"api/app/actions"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

type Audio struct {
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Source string `json:"source" bson:"source"`
}

func (a *Audio) AddAudioExt() {
	client, context := actions.MongoConnection()

	res, err := client.Database(conf.Mongo.Db).Collection(tableName).InsertOne(context, a)
	actions.IfLogFatal(err)
	a.ID = res.InsertedID.(primitive.ObjectID)
}

func (a *Audio) Get(objId string) {
	client, context := actions.MongoConnection()

	log.Println("obj_id: " + objId)

	id, err := primitive.ObjectIDFromHex(objId)
	actions.IfLogFatal(err)

	filter := bson.D{{
		"_id", id,
	}}

	res := client.Database(conf.Mongo.Db).Collection(tableName).FindOne(context, filter)
	err = res.Decode(a)
	actions.IfLogFatal(err)
}
