package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.PUT("/update/:id", controllers.UpdateProduct)
}
