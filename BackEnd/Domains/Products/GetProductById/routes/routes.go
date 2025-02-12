package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/controllers"
	"github.com/gin-gonic/gin"
)

// SetupRoutes configura las rutas del microservicio

func SetupRoutes(router *gin.Engine) {
	router.GET("/products/:id", controllers.GetProductByIdController)
}
