package services

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/models"
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/UpdateProduct/repositories"
)

func UpdateProductByID(id string, product models.Product) error {
	return repositories.UpdateByID(id, product)
}
