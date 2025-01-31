package services

import (
	"errors"
	"fmt"

	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/models"
	"github.com/SebastianPE0/DressShop_E-Commerce-Platform/BackEnd/Products/CreateProduct/repositories"
)

// CreateProduct valida la categoría antes de guardar el producto
func CreateProduct(product *models.Product) error {
	// Validar que la categoría exista con GraphQL
	isValid, err := ValidateCategory(product.CategoryID)
	if err != nil {
		return fmt.Errorf("error connecting to GraphQL: %v", err)
	}

	if !isValid {
		return errors.New("invalid category ID")
	}

	// Si la categoría es válida, guardar el producto
	err = repositories.InsertProduct(product)
	if err != nil {
		return fmt.Errorf("error inserting product: %v", err)
	}

	return nil
}
