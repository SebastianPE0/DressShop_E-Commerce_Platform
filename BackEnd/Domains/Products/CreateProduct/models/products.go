package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Product struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"` // Aquí `omitempty` permite que MongoDB lo genere si no se asigna
	Name       string             `bson:"name"`
	Price      float64            `bson:"price"`
	Stock      int                `bson:"stock"`
	CategoryID string             `bson:"category_id"`
}
