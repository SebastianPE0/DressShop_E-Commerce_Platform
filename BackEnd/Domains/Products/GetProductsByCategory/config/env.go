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
		log.Println("No .env file found. Using system environment variables.")
	}
}

// GetEnv obtiene el valor de una variable de entorno con un valor por defecto
func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// GetPort retrieves the application port from environment variables.
func GetPort() string {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "80" // Default port
	}
	return port
}
