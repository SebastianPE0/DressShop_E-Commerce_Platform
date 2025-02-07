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
	fmt.Println("🔍 Intentando conectar con GraphQL en:")
	fmt.Println("HOLAAAAAAAAAAAAAAAAAAAAAAAa")
	graphqlURL := os.Getenv("GRAPHQL_URL")

	fmt.Println("🔍 Intentando conectar con GraphQL en:", graphqlURL)

	query := fmt.Sprintf(`{"query":"query { category(id: \"%s\") { id name } }"}`, categoryID)

	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer([]byte(query)))
	if err != nil {
		fmt.Println("")
		fmt.Println("")
		fmt.Println("")
		fmt.Println("❌ Error creando la petición:", err)
		return false, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("")
		fmt.Println("")
		fmt.Println("")
		fmt.Println("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAA Error conectando a GraphQL:", err)
		fmt.Println("")
		return false, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("")
		fmt.Println("")
		fmt.Println("")
		fmt.Println("❌ Error leyendo la respuesta:", err)
		return false, err
	}
	fmt.Println("")
	fmt.Println("")
	fmt.Println("")
	fmt.Println("✅ Respuesta de GraphQL:", string(body))

	var result CategoryResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println("")
		fmt.Println("")
		fmt.Println("")
		fmt.Println("❌ Error parseando JSON:", err)
		return false, err
	}

	// Si `result.Data.Category.ID` existe, la categoría es válida
	if result.Data.Category.ID != "" {
		fmt.Println("")
		fmt.Println("")
		fmt.Println("✅ Categoría válida:", result.Data.Category.ID)
		return true, nil
	}

	fmt.Println("⚠️ Categoría no encontrada")
	return false, nil
}
