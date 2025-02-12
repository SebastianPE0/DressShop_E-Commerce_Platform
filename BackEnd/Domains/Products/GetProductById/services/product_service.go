package services

import (
	"errors"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductById/repositories"
)

// GetProductByIdService obtiene un producto por su ID
func GetProductByIdService(id string) (interface{}, error) {
	product, err := repositories.GetProductByIdRepository(id)
	if err != nil {
		return nil, errors.New("producto no encontrado")
	}
	return product, nil
}
