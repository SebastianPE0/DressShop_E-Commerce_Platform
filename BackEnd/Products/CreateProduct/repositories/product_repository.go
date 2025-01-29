package repositories

import (
	"context"
	"time"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/models"
)

func InsertProduct(product *models.Product) error { // <-- Cambia a puntero (*models.Product)
	collection := config.GetMongoCollection("products")

	// Context with time limit for the operation
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Insert the product into the database
	_, err := collection.InsertOne(ctx, product)
	return err
}
