package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/internal/models"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func main() {
	// Cargar variables desde el archivo .env
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

	// Configurar el puerto del servidor desde el archivo .env
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080" // Valor por defecto si no está configurado
	}

	// Configurar las rutas HTTP
	http.HandleFunc("/create", createProductHandler)

	fmt.Printf("Servicio corriendo en el puerto %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Handler para crear un producto
func createProductHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Decodificar el producto desde el cuerpo de la solicitud
	var product models.Product
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		log.Printf("Error al decodificar el producto: %v", err) // Log del error
		http.Error(w, "Error al decodificar el cuerpo de la solicitud", http.StatusBadRequest)
		return
	}

	// Insertar el producto en MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := client.Database("ecommerce").Collection("products")
	_, err := collection.InsertOne(ctx, product)
	if err != nil {
		log.Printf("Error al insertar el producto: %v", err) // Log del error
		http.Error(w, "Error al insertar el producto", http.StatusInternalServerError)
		return
	}

	// Responder al cliente
	log.Println("Producto insertado con éxito:", product) // Log del éxito
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Producto creado con éxito"))
}
