package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/DeleteProduct/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.DELETE("/delete/:id", controllers.DeleteProduct)
}
