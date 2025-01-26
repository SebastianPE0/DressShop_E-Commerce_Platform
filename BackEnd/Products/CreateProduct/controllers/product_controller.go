package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/models"
	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/services"
	"github.com/gin-gonic/gin"
)

func CreateProduct(c *gin.Context) {
	var product models.Product

	// Validate and decode the request body
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	// Call the service to create the product
	if err := services.CreateProductService(product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "The product could not be created"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Product created successfully"})
}
