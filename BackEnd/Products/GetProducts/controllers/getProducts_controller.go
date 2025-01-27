package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/services"

	"github.com/gin-gonic/gin"
)

func GetProducts(c *gin.Context) {
	// Call the service to retrieve all products
	products, err := services.GetProductsService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve products"})
		return
	}

	c.JSON(http.StatusOK, products)
}
