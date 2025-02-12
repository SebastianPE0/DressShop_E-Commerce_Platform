package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/create", controllers.CreateProduct)
}
