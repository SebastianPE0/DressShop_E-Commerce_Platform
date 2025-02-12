package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/services"
	"github.com/gin-gonic/gin"
)

// GetProductByIdController maneja la solicitud para obtener un producto por ID
func GetProductByIdController(c *gin.Context) {
	id := c.Param("id")
	product, err := services.GetProductByIdService(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"product": product})
}
