package main

import (
	"log"

	"github.com/tuusuario/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/routes"
	"github.com/tuusuario/DressShop_E-commerce-Platform/BackEnd/Products/Shared/config"
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
