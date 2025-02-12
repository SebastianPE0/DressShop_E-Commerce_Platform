package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/DeleteProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/DeleteProduct/routes"
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
	log.Printf("DeleteProduct server running on port %s", port)

	r.Run(":" + port)

}
