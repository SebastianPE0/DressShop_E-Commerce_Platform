package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// upload enviroment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Conect to MongoDB
	config.ConnectMongoDB()

	// server configuration
	router := gin.Default()
	routes.SetupRoutes(router)

	port := ":8083"
	log.Printf("GetProducts server running on port %s", port)
	router.Run(port)
}
