package services

import (
	"fmt"

	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/models"
	"github.com/SebastianPE0/DressShop_E-commerce-Platform/BackEnd/Products/CreateProduct/repositories"
)

func CreateProductService(product models.Product) error {

	//Validations
	if product.Price <= 0 {
		return fmt.Errorf("El precio debe ser mayor a cero")
	}

	// Call the repository to insert the product
	return repositories.InsertProduct(product)
}
