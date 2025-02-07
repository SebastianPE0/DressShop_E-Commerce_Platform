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

	fmt.Println("🔍 Enviando solicitud a GraphQL-Gateway:", graphqlURL) // Agregar log

	query := fmt.Sprintf(`{"query":"query { category(id: \"%s\") { id name } }"}`, categoryID)

	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer([]byte(query)))
	if err != nil {
		fmt.Println("❌ Error creando la petición:", err) // Agregar log
		return false, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("❌ Error al llamar a GraphQL:", err) // Agregar log
		return false, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("❌ Error leyendo la respuesta:", err) // Agregar log
		return false, err
	}

	fmt.Println("✅ Respuesta de GraphQL:", string(body)) // Agregar log

	var result CategoryResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println("❌ Error parseando la respuesta JSON:", err) // Agregar log
		return false, err
	}

	// Si `result.Data.Category.ID` existe, la categoría es válida
	if result.Data.Category.ID != "" {
		return true, nil
	}

	fmt.Println("⚠️ Categoría no encontrada en GraphQL") // Agregar log
	return false, nil
}
