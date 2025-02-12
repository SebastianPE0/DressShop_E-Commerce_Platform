package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/routes"
	"github.com/gin-gonic/gin"
)

func main() {

	config.LoadEnv()

	// Conectar a MongoDB
	config.ConnectDB()

	// Crear instancia de Gin
	router := gin.Default()

	router.Use(config.AuthMiddleware())

	// Configurar rutas
	routes.SetupRoutes(router)

	// Iniciar el servidor
	log.Println("Servidor corriendo en el puerto 80")
	if err := router.Run(":80"); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}

}
