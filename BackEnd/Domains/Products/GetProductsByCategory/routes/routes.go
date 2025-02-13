package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/controllers"
	"github.com/gin-gonic/gin"
)

// Configurar rutas
func SetupRoutes(r *gin.Engine) {
	r.GET("/products/category/:categoryId", controllers.GetProductsByCategory)
}
