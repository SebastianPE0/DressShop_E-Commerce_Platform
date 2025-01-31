package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/models"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/services"
	"github.com/gin-gonic/gin"
)

// CreateProduct maneja la solicitud para crear un producto
func CreateProduct(c *gin.Context) {
	var product models.Product

	// Validar y decodificar el cuerpo de la solicitud
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data format"})
		return
	}

	// Validar que la categoría exista usando GraphQL
	isValid, err := services.ValidateCategory(product.CategoryID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error connecting to category service"})
		return
	}

	if !isValid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	// Llamar al servicio para crear el producto
	if err := services.CreateProduct(&product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "The product could not be created"})
		return
	}

	// Respuesta exitosa con los detalles del producto creado
	c.JSON(http.StatusCreated, gin.H{
		"message": "Product created successfully",
		"product": product,
	})
}
