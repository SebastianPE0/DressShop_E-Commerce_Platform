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
		GetCategoryById struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"getCategoryById"`
	} `json:"data"`
}

// ValidateCategory consulta GraphQL para verificar si una categoría existe
func ValidateCategory(categoryID string) (bool, error) {
	graphqlURL := os.Getenv("GRAPHQL_URL")
	if graphqlURL == "" {
		return false, fmt.Errorf("⚠️ ERROR: La variable GRAPHQL_URL no está configurada")
	}

	// Construcción correcta de la consulta GraphQL
	query := fmt.Sprintf(`{"query":"query { getCategoryById(id: \"%s\") { id name } }"}`, categoryID)

	fmt.Println("🔍 Enviando solicitud GraphQL a:", graphqlURL)
	fmt.Println("📨 Query enviada:", query)

	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer([]byte(query)))
	if err != nil {
		fmt.Println(" Error al crear la solicitud HTTP:", err)
		return false, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(" Error al ejecutar la solicitud HTTP:", err)
		return false, err
	}
	defer resp.Body.Close()

	// Leer la respuesta
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(" Error al leer la respuesta de GraphQL:", err)
		return false, err
	}

	// Log de la respuesta recibida
	fmt.Println("📩 Respuesta completa de GraphQL:")
	fmt.Println(string(body))

	// Deserializar la respuesta JSON
	var result CategoryResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println(" Error al deserializar la respuesta JSON:", err)
		return false, err
	}

	// Verificar si la categoría existe
	if result.Data.GetCategoryById.ID != "" {
		fmt.Println(" Categoría encontrada:", result.Data.GetCategoryById.Name)
		return true, nil
	}

	fmt.Println(" Categoría NO encontrada:", categoryID)
	return false, nil
}
