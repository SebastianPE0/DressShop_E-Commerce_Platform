package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/tuusuario/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/controllers"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	// Microservice route
	router.POST("/create", controllers.CreateProduct)

	return router
}
