package repositories

import (
	"context"
	"errors"
	"time"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateByID(id string, product models.Product) error {
	// Obtener la colección desde la configuración
	collection := config.GetMongoCollection("products")

	// Convertir el ID en ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid product ID format")
	}

	// Crear un contexto con límite de tiempo
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Actualizar el producto en la base de datos
	update := bson.M{
		"$set": product,
	}

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objectID}, update)
	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errors.New("product not found")
	}

	return nil
}
