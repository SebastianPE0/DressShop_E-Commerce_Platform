package repositories

import (
	"context"
	"time"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/models"
)

// Guardar un nuevo producto en la base de datos
func CreateProduct(product *models.Product) error { // <-- Nombre cambiado de InsertProduct a CreateProduct
	collection := config.GetProductCollection() // <-- Eliminado el argumento "products"

	// Contexto con límite de tiempo
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Insertar el producto en MongoDB
	_, err := collection.InsertOne(ctx, product)
	return err
}
