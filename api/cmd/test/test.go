package test

import (
	"log"
	"net/smtp"
)

func Test() {

	from := "strcty11@gmail.com"

	auth := smtp.PlainAuth(
		"",
		from,
		"s6^%cf-<",
		"smtp.gmail.com",
	)

	to := []string{"atimrish11@gmail.com"}
	msg := []byte("To:from\r\n test message\r\n")
	err := smtp.SendMail(
		"smtp.gmail.com:587",
			auth,
			from,
			to,
			msg,
	)

	if err != nil {
		log.Fatal(err)
	}
}