package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/services"
)

type ProductController struct {
	Service *services.ProductService
}

func NewProductController(service *services.ProductService) *ProductController {
	return &ProductController{Service: service}
}

func (c *ProductController) GetProductsByCategory(w http.ResponseWriter, r *http.Request) {
	categoryID := r.URL.Query().Get("category_id")
	if categoryID == "" {
		http.Error(w, "Missing category_id", http.StatusBadRequest)
		return
	}

	products, err := c.Service.GetProductsByCategory(categoryID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
