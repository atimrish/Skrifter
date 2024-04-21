package actions

import "log"

func IfLogFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
