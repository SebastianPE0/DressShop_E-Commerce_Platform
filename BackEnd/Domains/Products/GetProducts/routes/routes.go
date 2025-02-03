package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/controllers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupRoutes(client *mongo.Client) *gin.Engine {
	router := gin.Default()

	// Microservice route
	router.GET("/products", controllers.GetProducts)

	return router
}
