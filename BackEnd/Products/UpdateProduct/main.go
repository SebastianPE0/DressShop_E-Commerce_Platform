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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Modelo para el producto
type Product struct {
	Name  string  `json:"name,omitempty"`
	Price float64 `json:"price,omitempty"`
}

var client *mongo.Client

func main() {
	// Cargar las variables de entorno desde .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error cargando el archivo .env: %v", err)
	}

	// Leer la URI de MongoDB desde las variables de entorno
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI no está configurada en el archivo .env")
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

	// Configurar la ruta para actualizar productos
	http.HandleFunc("/update", updateProductHandler)

	// Iniciar el servidor
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8085" // Puerto por defecto
	}
	fmt.Printf("Servicio UpdateProduct corriendo en el puerto %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Handler para actualizar productos
func updateProductHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Leer el ID del producto desde los parámetros de la URL
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Se requiere un ID para actualizar el producto", http.StatusBadRequest)
		return
	}

	// Convertir el ID a ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	// Decodificar el cuerpo de la solicitud
	var product Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, "Error al decodificar el cuerpo de la solicitud", http.StatusBadRequest)
		return
	}

	// Crear el filtro y el documento de actualización
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": product}

	// Actualizar el producto en la base de datos
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := client.Database("ecommerce").Collection("products")
	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Printf("Error al actualizar el producto: %v", err)
		http.Error(w, "Error al actualizar el producto", http.StatusInternalServerError)
		return
	}

	// Verificar si se actualizó algún documento
	if result.MatchedCount == 0 {
		http.Error(w, "No se encontró un producto con el ID especificado", http.StatusNotFound)
		return
	}

	// Responder con éxito
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Producto actualizado con éxito"})
}
