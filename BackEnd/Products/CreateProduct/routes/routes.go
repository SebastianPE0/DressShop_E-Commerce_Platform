package routes

import (
	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	// Microservice route
	router.POST("/create", controllers.CreateProduct)

	return router
}
