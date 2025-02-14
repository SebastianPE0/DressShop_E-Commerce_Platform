package controllers

import (
	"log"
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/repositories"
	"github.com/gin-gonic/gin"
)

// Obtener productos por categoría
func GetProductsByCategory(c *gin.Context) {
	categoryID := c.Param("categoryId")

	products, err := repositories.GetProductsByCategory(categoryID)
	if err != nil {
		log.Println("❌ Error al obtener productos por categoría:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener productos"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"products": products})
}
