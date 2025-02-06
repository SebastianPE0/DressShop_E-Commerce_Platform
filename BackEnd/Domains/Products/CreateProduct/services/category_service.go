package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// GraphQLQuery representa la estructura para enviar la consulta GraphQL
type GraphQLQuery struct {
	Query string `json:"query"`
}

// Category representa la estructura de una categoría
type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// CategoryResponse representa la respuesta de GraphQL
type CategoryResponse struct {
	Data struct {
		GetCategoryById *Category `json:"getCategoryById"`
	} `json:"data"`
}

// ValidateCategory consulta GraphQL para verificar si una categoría existe
func ValidateCategory(categoryID string) (bool, error) {
	graphqlURL := os.Getenv("GRAPHQL_URL")
	if graphqlURL == "" {
		return false, fmt.Errorf("GRAPHQL_URL no está configurada en las variables de entorno")
	}

	// Construcción correcta del query con `getCategoryById`
	query := GraphQLQuery{
		Query: fmt.Sprintf(`query { getCategoryById(id: \"%s\") { id name } }`, categoryID),
	}

	queryJSON, err := json.Marshal(query)
	if err != nil {
		return false, fmt.Errorf("error al serializar el query GraphQL: %v", err)
	}

	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer(queryJSON))
	if err != nil {
		return false, fmt.Errorf("error al crear la solicitud HTTP: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, fmt.Errorf("error al hacer la solicitud a GraphQL: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return false, fmt.Errorf("error en la respuesta de GraphQL: código de estado %d", resp.StatusCode)
	}

	var result CategoryResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return false, fmt.Errorf("error al decodificar la respuesta JSON: %v", err)
	}

	// Validar correctamente si la categoría existe
	if result.Data.GetCategoryById != nil && result.Data.GetCategoryById.ID != "" {
		return true, nil
	}

	return false, nil
}
