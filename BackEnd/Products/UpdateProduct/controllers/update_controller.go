package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/models"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/services"
	"github.com/gin-gonic/gin"
)

func UpdateProduct(c *gin.Context) {
	// Obtener el ID del parámetro de la URL
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Product ID is required"})
		return
	}

	// Crear una instancia del modelo Product para recibir los datos del cuerpo de la solicitud
	var product models.Product

	// Parsear y validar el cuerpo de la solicitud
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Llamar al servicio para actualizar el producto
	err := services.UpdateProductByID(id, product)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Responder con un mensaje de éxito
	c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully"})
}
