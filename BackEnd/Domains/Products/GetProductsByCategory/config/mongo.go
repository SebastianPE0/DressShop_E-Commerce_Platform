package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db *mongo.Database

func ConnectDB() {
	// Cargar variables de entorno desde .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error al cargar archivo .env")
	}

	// Obtener URI y nombre de la base de datos
	mongoURI := os.Getenv("MONGO_URI")
	mongoDBName := os.Getenv("MONGO_DBNAME")

	// 🔥 Imprimir en la terminal el URI y la Base de Datos (sin credenciales sensibles)
	fmt.Println("🔍 MongoDB URI:", mongoURI)
	fmt.Println("🔍 Base de Datos:", mongoDBName)

	if mongoDBName == "" {
		log.Fatal("❌ Error: La variable de entorno MONGO_DBNAME está vacía")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("❌ Error al conectar a MongoDB:", err)
	}

	// Ping para verificar la conexión
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("❌ No se pudo hacer ping a MongoDB:", err)
	}

	db = client.Database(mongoDBName)
	fmt.Println("✅ Conectado a MongoDB:", mongoDBName)
}

// Obtener la colección de productos
func GetProductCollection() *mongo.Collection {
	return db.Collection("products")
}
