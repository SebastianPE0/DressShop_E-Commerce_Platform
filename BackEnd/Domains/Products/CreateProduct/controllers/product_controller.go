package controllers

import (
	"log"
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/models"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/repositories"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/services"

	"github.com/gin-gonic/gin"
)

// Crear un nuevo producto
func CreateProduct(c *gin.Context) {
	var product models.Product

	// Debug: Mostrar el body recibido
	if err := c.ShouldBindJSON(&product); err != nil {
		log.Println("❌ Error al leer el JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("🔍 Producto recibido:", product)

	// Verificar si el campo categoryid se está enviando correctamente
	if product.CategoryID == "" {
		log.Println("⚠️ Error: categoryid está vacío")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Remember. El campo category_id es requerido"})
		return
	}

	// Validar si la categoría existe en GraphQL
	if !services.ValidateCategory(product.CategoryID, c) { // <-- Se pasa el contexto para enviar el token
		c.JSON(http.StatusBadRequest, gin.H{"error": "Categoría no encontrada"})
		return
	}

	// Guardar producto en MongoDB
	if err := repositories.CreateProduct(&product); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo crear el producto"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Producto creado exitosamente"})
}
