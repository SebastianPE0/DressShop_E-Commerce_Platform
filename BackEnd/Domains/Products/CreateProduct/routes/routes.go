package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/controllers"
	"github.com/gin-gonic/gin"
)

// SetupRoutes configura las rutas del servidor con Gin
func SetupRoutes(router *gin.Engine) {
	protectedRoutes := router.Group("/")
	{
		protectedRoutes.POST("/product", controllers.CreateProduct)
	}
}
