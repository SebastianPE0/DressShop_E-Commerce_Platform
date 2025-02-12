package routes

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine, controller *controllers.ProductController) {
	router.GET("/products/by-category", controller.GetProductsByCategory)
}
