package controllers

import (
	"net/http"

	"github.com/SebastianPE0/DressShop_E-Commerce_Platform/BackEnd/Products/GetProductsByCategory/services"
	"github.com/gin-gonic/gin"
)

type ProductController struct {
	Service *services.ProductService
}

func NewProductController(service *services.ProductService) *ProductController {
	return &ProductController{Service: service}
}

func (c *ProductController) GetProductsByCategory(ctx *gin.Context) {
	categoryID := ctx.Query("category_id")
	if categoryID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Missing category_id"})
		return
	}

	products, err := c.Service.GetProductsByCategory(categoryID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, products)
}
