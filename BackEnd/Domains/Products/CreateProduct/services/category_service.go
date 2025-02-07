package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type GraphQLQuery struct {
	Query string `json:"query"`
}

type CategoryData struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type GraphQLResponse struct {
	Data struct {
		Category *CategoryData `json:"category"`
	} `json:"data"`
}

func ValidateCategory(categoryID string) (bool, error) {
	graphqlURL := os.Getenv("GRAPHQL_URL")

	query := fmt.Sprintf(`{"query":"query { category(id: \"%s\") { id name } }"}`, categoryID)

	req, err := http.NewRequest("POST", graphqlURL, bytes.NewBuffer([]byte(query)))
	if err != nil {
		return false, err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return false, err
	}

	var result GraphQLResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return false, err
	}

	if result.Data.Category != nil {
		return true, nil
	}

	return false, nil
}
