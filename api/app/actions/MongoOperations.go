package actions

import (
	"api/config"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MongoConnection() (*mongo.Client, context.Context) {
	conf := config.InitConfig()

	address := fmt.Sprintf("mongodb://%s:%s/", conf.Mongo.Address, conf.Mongo.Port)

	ctx := context.TODO()
	clientOptions := options.Client().ApplyURI(address)

	cred := options.Credential{
		Username: conf.Mongo.User,
		Password: conf.Mongo.Password,
	}

	clientOptions.Auth = &cred

	client, err := mongo.Connect(ctx, clientOptions)
	IfLogFatal(err)

	return client, ctx
}
