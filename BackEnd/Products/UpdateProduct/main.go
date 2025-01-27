package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/routes"
)

func main() {
	// Load environment variables and connect to MongoDB
	config.LoadEnv()
	client := config.ConnectMongoDB()
	defer client.Disconnect(nil)

	// Configure routes
	router := routes.SetupRoutes(client)

	// Start the server
	port := config.GetPort()
	log.Printf("UpdateProduct server running on the port %s", port)
	router.Run(":" + port)
}
