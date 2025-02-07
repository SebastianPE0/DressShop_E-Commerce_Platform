package main

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/controllers"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/repositories"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/routes"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/services"
)

func main() {
	// Cargar variables de entorno
	config.LoadEnv()

	// Conectar a la base de datos
	db := config.ConnectDB()
	productRepo := repositories.NewProductRepository(db)
	productService := services.NewProductService(productRepo)
	productController := controllers.NewProductController(productService)

	mux := http.NewServeMux()
	routes.RegisterRoutes(mux, productController)

	http.ListenAndServe(":80", mux)
}
