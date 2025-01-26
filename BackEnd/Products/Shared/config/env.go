package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv loads the environment variables from the .env file.
func LoadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Println("Could not load .env file, using system environment variables")
	}
}

// GetPort returns the application port from the environment variables.
func GetPort() string {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080" // Default port
	}
	return port
}
