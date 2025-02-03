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

// ConnectMongoDB initializes the connection to MongoDB.
func ConnectMongoDB() *mongo.Client {
	if client != nil {
		return client
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI is not set in environment variables")
	}

	var err error
	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("MongoDB connection test failed: %v", err)
	}

	log.Println("Connected to MongoDB successfully")
	return client
}

// GetMongoCollection returns a specific MongoDB collection.
func GetMongoCollection(collectionName string) *mongo.Collection {
	return client.Database("ecommerce").Collection(collectionName)
}
