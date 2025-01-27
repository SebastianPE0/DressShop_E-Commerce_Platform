package repositories

import (
	"context"

	"time"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllProducts() ([]models.Product, error) {
	collection := config.GetMongoCollection("products")

	// Context with time limit for the operation
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var products []models.Product
	for cursor.Next(ctx) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			continue
		}
		products = append(products, product)
	}

	return products, nil
}
