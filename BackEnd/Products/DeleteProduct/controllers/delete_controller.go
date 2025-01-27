package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/DeleteProduct/services"
	"github.com/gin-gonic/gin"
)

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")

	err := services.DeleteProductByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}
