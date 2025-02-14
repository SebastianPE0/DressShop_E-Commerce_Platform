package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv loads environment variables from the .env file.
func LoadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Println("Could not load .env file, using system environment variables")
	}
}

// GetPort retrieves the application port from environment variables.
func GetPort() string {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "6003" // Default port
	}
	return port
}
