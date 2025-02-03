package services

import (
	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/DeleteProduct/repositories"
)

func DeleteProductByID(id string) error {

	return repositories.DeleteByID(id)
}
