package services

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/models"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProducts/repositories"
)

func GetProductsService() ([]models.Product, error) {
	// Call the repository to retrieve products
	return repositories.GetAllProducts()
}
