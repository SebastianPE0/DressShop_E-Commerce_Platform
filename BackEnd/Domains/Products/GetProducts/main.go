package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/routes"
)

func main() {
	// Load environment variables and connect to MongoDB
	config.LoadEnv()
	client := config.ConnectMongoDB()
	defer client.Disconnect(nil)

	// Configure routes
	router := routes.SetupRoutes(client)

	// Start server
	port := config.GetPort()
	log.Printf("GetProducts server running on the port %s", port)
	router.Run(":" + port)
}
