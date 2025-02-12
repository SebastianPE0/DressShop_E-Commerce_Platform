package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	client := config.ConnectMongoDB()
	defer client.Disconnect(nil)

	r := gin.Default()

	r.Use(config.AuthMiddleware())

	routes.SetupRoutes(r)

	port := config.GetPort()
	log.Printf("UpdateProduct server running on port %s", port)

	r.Run(":" + port)
}
