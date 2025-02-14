package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	
	config.ConnectDB()

	// Crear instancia de Gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://3.214.134.68"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.Use(config.AuthMiddleware())
	// Configurar el servidor con Gin

	// Aplicar CORS

	// Configurar rutas
	routes.SetupRoutes(router)

	// Iniciar el servidor
	log.Println("Servidor corriendo en el puerto 80")
	if err := router.Run(":6002"); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}

}
