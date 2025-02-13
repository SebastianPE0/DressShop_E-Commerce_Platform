package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/controllers"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/repositories"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/routes"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	db := config.ConnectDB()
	productRepo := repositories.NewProductRepository(db)
	productService := services.NewProductService(productRepo)
	productController := controllers.NewProductController(productService)

	r := gin.Default()

	// Configuración de CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://54.205.137.190"}, // Cambia esto a los dominios específicos si lo necesitas
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.Use(config.AuthMiddleware()) // Middleware de autenticación
	routes.RegisterRoutes(r, productController)
	//TEST
	port := config.GetPort()
	log.Printf("GetProductsByCategory service running on port %s", port)
	r.Run(":" + port)
}
