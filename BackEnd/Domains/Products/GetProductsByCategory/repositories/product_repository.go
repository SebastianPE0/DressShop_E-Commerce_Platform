package repositories

import (
	"context"
	"log"
	"time"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/config"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Obtener productos por ID de categoría
func GetProductsByCategory(categoryID string) ([]models.Product, error) {
	collection := config.GetProductCollection()

	var products []models.Product

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 🔥 Asegurar que el filtro busca correctamente `categoryid` como String
	filter := bson.M{"category_id": categoryID}
	log.Printf("🔍 Buscando productos con categoryid: %s\n", categoryID) // Debug

	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		log.Println("❌ Error en consulta MongoDB:", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			log.Println("❌ Error al decodificar producto:", err)
			return nil, err
		}
		products = append(products, product)
	}

	// 🔍 Debug: Verificar cuántos productos se encontraron
	log.Printf("🔍 Productos encontrados: %d\n", len(products))

	return products, nil
}
