package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv carga las variables de entorno desde un archivo .env
func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found, using system environment variables.")
	}
}

// GetMongoURI obtiene la URI de MongoDB desde las variables de entorno
func GetMongoURI() string {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017/products_db"
	}
	return mongoURI
}

// GetPort obtiene el puerto desde las variables de entorno
func GetPort() string {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8082"
	}
	return port
}
