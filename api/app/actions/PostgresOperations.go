package actions

import (
	"api/config"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDsn() string {
	cfg := config.InitConfig().Postgres
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s", cfg.User, cfg.Password, cfg.Address, cfg.Port, cfg.Db)
}

func GetDb() *gorm.DB {
	db, err := gorm.Open(postgres.Open(GetDsn()))
	IfLogFatal(err)

	return db
}