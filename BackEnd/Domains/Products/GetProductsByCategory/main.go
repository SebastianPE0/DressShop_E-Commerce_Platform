package main

import (
	"fmt"
	"log"
	"os"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	//TEST
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error al cargar archivo .env")
	}

	// Conectar a MongoDB
	config.ConnectDB()

	// Configurar el servidor con Gin
	r := gin.Default()

	// Aplicar CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://54.205.137.190"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Configurar rutas
	routes.SetupRoutes(r)

	// Usar el puerto desde `.env`
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001" // 🔥 Valor por defecto si no está definido en .env
	}

	fmt.Println("✅ Servidor ejecutándose en puerto", port)
	r.Run(":" + port)
}
