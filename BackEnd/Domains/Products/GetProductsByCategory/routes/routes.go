package routes

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/controllers"
)

func RegisterRoutes(mux *http.ServeMux, controller *controllers.ProductController) {
	mux.HandleFunc("/products/by-category", controller.GetProductsByCategory)
}
