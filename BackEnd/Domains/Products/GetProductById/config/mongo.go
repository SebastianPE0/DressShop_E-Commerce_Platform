package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

// ConnectDB establece la conexión con MongoDB
func ConnectDB() {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI no está configurada en las variables de entorno")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Error conectando a MongoDB:", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("No se pudo conectar a MongoDB:", err)
	}

	log.Println("Conectado a MongoDB")
}

// GetDB obtiene la instancia de la base de datos
func GetDB() *mongo.Database {
	return client.Database(os.Getenv("MONGO_DB_NAME"))
}
