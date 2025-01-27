package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/controllers"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupRoutes(client *mongo.Client) *gin.Engine {
	router := gin.Default()

	// Register routes
	router.PUT("/update/:id", controllers.UpdateProduct)

	return router
}
