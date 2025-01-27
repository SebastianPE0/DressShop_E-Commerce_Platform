package repositories

import (
	"context"
	"errors"
	"time"

	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/DeleteProduct/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteByID(id string) error {
	collection := config.GetCollection("products")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid product ID format")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return errors.New("product not found")
	}

	return nil
}
