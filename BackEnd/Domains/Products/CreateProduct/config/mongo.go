package config

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	clientOptions := options.Client().ApplyURI(GetEnv("MONGO_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Verificar la conexión
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("✅ Conectado a MongoDB")
	DB = client.Database("product_db")
}

// Obtener colección de productos
func GetProductCollection() *mongo.Collection { // <-- Elimina el argumento
	return DB.Collection("products")
}
