package main

import (
	"fmt"
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	
	config.ConnectDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://3.214.134.68"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	r.Use(config.AuthMiddleware())

	routes.SetupRoutes(r)

	port := config.GetEnv("PORT")
	fmt.Println("Servidor ejecutándose en puerto", port)
	log.Fatal(r.Run(":" + port))
}
