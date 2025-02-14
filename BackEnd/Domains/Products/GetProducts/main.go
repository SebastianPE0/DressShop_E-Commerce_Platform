package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	client := config.ConnectMongoDB()
	defer client.Disconnect(nil)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://54.205.137.190"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	//DEPLOY
	r.Use(config.AuthMiddleware())

	routes.SetupRoutes(r)

	port := config.GetPort()
	log.Printf("GetAllProducts server running on port %s", port)

	r.Run(":" + port)
}
