package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Estructura del producto
type Product struct {
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var client *mongo.Client

func main() {
	// Cargar las variables de entorno desde el archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %v", err)
	}

	// Configuración de la URI de MongoDB
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI no está configurado en el archivo .env")
	}

	// Conexión a MongoDB
	client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatalf("Error al conectar a MongoDB: %v", err)
	}

	// Verificar la conexión
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("No se pudo conectar a MongoDB: %v", err)
	}

	fmt.Println("Conexión exitosa a MongoDB")

	// Configurar las rutas HTTP
	http.HandleFunc("/products", getProductsHandler)

	// Inicia el servidor
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8083" // Puerto por defecto
	}
	fmt.Printf("Servicio GetProducts corriendo en el puerto %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Handler para obtener productos
func getProductsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Contexto para la consulta
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Obtener la colección
	collection := client.Database("ecommerce").Collection("products")

	// Realizar la consulta
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Printf("Error al obtener los productos: %v", err)
		http.Error(w, "Error al obtener los productos", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	// Decodificar los resultados
	var products []Product
	if err = cursor.All(ctx, &products); err != nil {
		log.Printf("Error al decodificar los productos: %v", err)
		http.Error(w, "Error al procesar los productos", http.StatusInternalServerError)
		return
	}

	// Responder con los productos
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
