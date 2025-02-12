const axios = require('axios');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const GET_PRODUCT_BY_ID_SERVICE_URL = process.env.GET_PRODUCT_BY_ID_SERVICE_URL;  // ✅ NUEVO ENDPOINT
const ADD_PRODUCT_TO_CART_SERVICE_URL = process.env.ADD_PRODUCT_TO_CART_SERVICE_URL;

const getCategoryById = async (id) => {
  try {
    console.log(`Fetching category from: ${CATEGORY_SERVICE_URL}/${id}`);
    const response = await axios.get(`${CATEGORY_SERVICE_URL}/${id}`);
    
    if (response.data) {
      return {
        id: response.data._id, 
        name: response.data.name,
        description: response.data.description,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return null;
  }
};


const getProductById = async (productId) => {
  try {
    console.log(`Fetching product from: ${GET_PRODUCT_BY_ID_SERVICE_URL}/${productId}`);
    const response = await axios.get(`${GET_PRODUCT_BY_ID_SERVICE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error.response ? error.response.data : error.message);
    return null;
  }
};

const addProductToCart = async (_, { cart_id, product_id, quantity }) => {
  try {
    const response = await axios.post(`${ADD_PRODUCT_TO_CART_SERVICE_URL}/cart/add`, {
      cart_id,
      product_id,
      quantity
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error.response ? error.response.data : error.message);
    throw new Error("Error al agregar producto al carrito.");
  }
};

const resolvers = {
  Query: {
    category: async (_, { id }) => await getCategoryById(id),
    getProductsByCategory: async (_, { categoryId }) => {
      try {
        console.log(`Fetching products from: ${PRODUCT_SERVICE_URL}?category_id=${categoryId}`);
        const response = await axios.get(`${PRODUCT_SERVICE_URL}?category_id=${categoryId}`);
        return response.data || [];
      } catch (error) {
        console.error("Error fetching products by category:", error.response ? error.response.data : error.message);
        throw new Error("Error al obtener productos por categoría.");
      }
    },
    getProductById: async (_, { productId }) => await getProductById(productId) 
  },
  Mutation: {
    addProductToCart
  }
};

module.exports = resolvers;
