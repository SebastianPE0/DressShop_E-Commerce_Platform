package main

import (
	"log"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/DeleteProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/DeleteProduct/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Conectar a MongoDB
	config.ConnectMongoDB()

	// Configuración del servidor
	router := gin.Default()
	routes.SetupRoutes(router)

	port := ":80"
	log.Printf("DeleteProduct server running on port %s", port)
	router.Run(port)
}
