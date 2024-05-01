package main

import (
	"api/cmd/migrate"
	"api/cmd/seeder"
	"api/cmd/server"
	"api/cmd/test"
	"flag"
	"fmt"
)

func main() {

	action := flag.String("action", "", "action to do")
	flag.Parse()

	switch *action {
	case "serve":
		server.Serve()
		break
	case "migrate":
		migrate.Up()
		break
	case "seed":
		seeder.Seed()
		break
	case "test":
		test.Test()
		break
	default:
		fmt.Println("no actions matched")
	}
}
