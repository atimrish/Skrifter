package server

import (
	"api/app/routes"
	"api/config"
	"fmt"
	"log"
	"net/http"
)

func Serve() {

	cfg := config.InitConfig()

	address := fmt.Sprintf("%s:%s", cfg.HttpServer.Host, cfg.HttpServer.Port)

	log.Println("app run on " + address)
	err := http.ListenAndServe(address, routes.InitRouter())

	if err != nil {
		log.Fatal(err)
	}
}
