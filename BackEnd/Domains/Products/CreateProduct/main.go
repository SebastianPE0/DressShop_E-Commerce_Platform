package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/routes"
)

func main() {
	// Load environment variables and connect to MongoDB
	config.LoadEnv()
	client := config.ConnectMongoDB()
	defer client.Disconnect(nil)

	// Configure routes
	router := routes.SetupRoutes()

	// Start server
	port := config.GetPort()
	log.Printf("CreateProduct server running on the port %s", port)
	router.Run(":" + port)
}
