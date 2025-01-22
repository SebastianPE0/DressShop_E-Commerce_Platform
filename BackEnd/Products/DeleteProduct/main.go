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

var client *mongo.Client

func main() {
	// Cargar variables de entorno desde .env
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

	// Verificar la conexión a MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("No se pudo conectar a MongoDB: %v", err)
	}

	fmt.Println("Conexión exitosa a MongoDB")

	// Configuración de rutas HTTP
	http.HandleFunc("/delete", deleteProductHandler)

	// Iniciar el servidor
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8084" // Puerto por defecto
	}
	fmt.Printf("Servicio DeleteProduct corriendo en el puerto %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Handler para eliminar un producto
func deleteProductHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Leer el ID del producto desde los parámetros de la URL
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Se requiere un ID para eliminar el producto", http.StatusBadRequest)
		return
	}

	// Convertir el ID a ObjectID
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	// Contexto para la operación
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Obtener la colección
	collection := client.Database("ecommerce").Collection("products")

	// Eliminar el producto
	result, err := collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		log.Printf("Error al eliminar el producto: %v", err)
		http.Error(w, "Error al eliminar el producto", http.StatusInternalServerError)
		return
	}

	// Verificar si se eliminó algún documento
	if result.DeletedCount == 0 {
		http.Error(w, "No se encontró un producto con el ID especificado", http.StatusNotFound)
		return
	}

	// Responder con éxito
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Producto eliminado con éxito"})
}
