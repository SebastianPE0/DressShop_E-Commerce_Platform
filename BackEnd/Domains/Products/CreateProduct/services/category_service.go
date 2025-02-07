package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// GraphQLQuery estructura para enviar la consulta
type GraphQLQuery struct {
	Query string `json:"query"`
}

// CategoryResponse estructura para la respuesta de GraphQL
type CategoryResponse struct {
	Data struct {
		Category struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"category"`
	} `json:"data"`
}

// ValidateCategory consulta GraphQL para verificar si una categoría existe
func ValidateCategory(categoryID string) (bool, error) {
	graphqlURL := os.Getenv("GRAPHQL_URL")

	// Verificar si GRAPHQL_URL está vacío
	if graphqlURL == "" {
		fmt.Println("❌ ERROR: GRAPHQL_URL no está configurado")
		return false, fmt.Errorf("GRAPHQL_URL no está configurado")
	}

	// Construcción del query GraphQL
	query := fmt.Sprintf(`{"query":"query { category(id: \"%s\") { id name } }"}`, categoryID)
	fmt.Println("🔍 Enviando petición a GraphQL:", graphqlURL)
	fmt.Println("📌 Query enviado:", query)

	// Crear la petición HTTP
	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer([]byte(query)))
	if err != nil {
		fmt.Println("❌ ERROR creando la petición:", err)
		return false, fmt.Errorf("Error creando la petición a GraphQL")
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("❌ ERROR conectando con GraphQL:", err)
		return false, fmt.Errorf("Error connecting to category service")
	}
	defer resp.Body.Close()

	// Leer la respuesta de GraphQL
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("❌ ERROR leyendo la respuesta:", err)
		return false, fmt.Errorf("Error leyendo la respuesta de GraphQL")
	}

	fmt.Println("✅ Respuesta de GraphQL:", string(body))

	var result CategoryResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println("❌ ERROR parseando JSON:", err)
		return false, fmt.Errorf("Error parseando la respuesta de GraphQL")
	}

	// Si `result.Data.Category.ID` existe, la categoría es válida
	if result.Data.Category.ID != "" {
		fmt.Println("✅ Categoría encontrada:", result.Data.Category.ID)
		return true, nil
	}

	fmt.Println("⚠️ Categoría no encontrada en GraphQL")
	return false, nil
}
