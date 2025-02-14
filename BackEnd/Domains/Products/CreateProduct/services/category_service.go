package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Estructura de la consulta GraphQL
type GraphQLQuery struct {
	Query string `json:"query"`
}

// Estructura de la respuesta GraphQL
type GraphQLResponse struct {
	Data struct {
		GetCategoryById *struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"getCategoryById"`
	} `json:"data"`
}

// Validar si la categoría existe en GraphQL
func ValidateCategory(categoryID string, c *gin.Context) bool {
	// Construimos la consulta sin escapado extra de comillas
	query := GraphQLQuery{
		Query: fmt.Sprintf(`{ getCategoryById(id: "%s") { id name } }`, categoryID), // <-- Comillas corregidas
	}

	queryBody, err := json.Marshal(query)
	if err != nil {
		log.Println("❌ Error al convertir la consulta GraphQL a JSON:", err)
		return false
	}

	log.Printf("🔍 Enviando consulta GraphQL a %s: %s\n", "http://52.4.35.158:4000/graphql", string(queryBody))

	// Obtener el token del header
	token := c.GetHeader("Authorization")
	if token == "" {
		log.Println("❌ Error: No se envió el token a GraphQL-Gateway")
		return false
	}

	// Crear la petición HTTP con el token en el header
	req, err := http.NewRequest("POST", "http://52.4.35.158:4000/graphql", bytes.NewBuffer(queryBody))
	if err != nil {
		log.Println("❌ Error al crear la solicitud HTTP:", err)
		return false
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", token) // <-- Se agrega el token a la cabecera

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("❌ Error en consulta GraphQL:", err)
		return false
	}
	defer resp.Body.Close()

	// Leer la respuesta sin decodificar
	respBody := new(bytes.Buffer)
	_, _ = respBody.ReadFrom(resp.Body)

	log.Printf("🔍 Respuesta sin procesar desde GraphQL-Gateway: %s\n", respBody.String())

	// Decodificar respuesta de GraphQL
	var result GraphQLResponse
	err = json.Unmarshal(respBody.Bytes(), &result)
	if err != nil {
		log.Println("❌ Error al decodificar respuesta GraphQL:", err)
		return false
	}

	log.Printf("🔍 Respuesta decodificada de GraphQL en ValidateCategory: %+v\n", result)

	// Verificar si la categoría existe
	if result.Data.GetCategoryById == nil {
		log.Println("⚠️ Categoría no encontrada en GraphQL")
		return false
	}

	log.Println("✅ Categoría encontrada:", result.Data.GetCategoryById.ID, "-", result.Data.GetCategoryById.Name)
	return true
}
