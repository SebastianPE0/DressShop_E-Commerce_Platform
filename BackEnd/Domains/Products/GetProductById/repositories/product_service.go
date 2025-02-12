package repositories

import (
	"context"
	"errors"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GetProductByIdRepository busca un producto en la base de datos por su ID
func GetProductByIdRepository(id string) (models.Product, error) {
	collection := config.GetDB().Collection("products")
	var product models.Product
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return product, errors.New("ID no válido")
	}

	err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&product)
	if err != nil {
		return product, errors.New("producto no encontrado")
	}
	return product, nil
}
