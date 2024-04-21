package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"log"
	"os"
)

type Config struct {
	Env        string `yaml:"env" env-default:"config" env-required:"true"`
	HttpServer `yaml:"http_server"`
	Jwt        `yaml:"jwt"`
	Postgres   `yaml:"postgres"`
}

type HttpServer struct {
	Host string `yaml:"host" env-default:"localhost"`
	Port string `yaml:"port" env-default:"8080"`
}

type Jwt struct {
	Secret string `yaml:"secret"`
}

type Postgres struct {
	Address  string `yaml:"address"`
	User     string `yaml:"user"`
	Db       string `yaml:"db"`
	Password string `yaml:"password"`
	Port     string `yaml:"port"`
}

func InitConfig() *Config {
	var cfg Config

	path, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	path += "/config/config.yml"

	err = cleanenv.ReadConfig(path, &cfg)
	if err != nil {
		log.Fatal(err)
	}

	return &cfg
}
