package actions

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) string {
	newPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	IfLogFatal(err)

	return string(newPassword)
}

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
