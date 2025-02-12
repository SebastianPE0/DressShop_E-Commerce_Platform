const axios = require('axios');
const config = require('../config/env');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const CART_SERVICE_URL = process.env.CART_SERVICE_URL; 
const PRODUCT_BY_ID_SERVICE_URL = process.env.PRODUCT_BY_ID_SERVICE_URL; 
const getCategoryById = async (id) => {
  try {
    console.log(`Fetching category from: ${CATEGORY_SERVICE_URL}/${id}`); // Debug
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
const getProductById = async (id) => {
  try {
    console.log(`Fetching product from: ${PRODUCT_BY_ID_SERVICE_URL}/products/${id}`);
    const response = await axios.get(`${PRODUCT_BY_ID_SERVICE_URL}/products/${id}`);

    if (response.data) {
      return {
        id: response.data._id,
        name: response.data.name,
        price: response.data.price,
        stock: response.data.stock,
        category_id: response.data.category_id
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }
};

const resolvers = {
  Query: {
    category: async (_, { id }) => {
      return await getCategoryById(id);
    },
    getProductById: async (_, { id }) => {
      return await getProductById(id);
    },
    getProductsByCategory: async (_, { categoryId }) => {
      try {
        const url = `${PRODUCT_SERVICE_URL}?category_id=${categoryId}`;
        console.log(`🔍 Sending request to: ${url}`);

        const response = await axios.get(url);
        console.log("Response from product service:", response.data);

        return response.data;
      } catch (error) {
        console.error("Error fetching products by category:", error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : error.message);
      }
    },
    getCartById: async (_, { cart_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `query { getCartById(cart_id: "${cart_id}") { id items { product_id quantity name price } } }`
        });

        return response.data.data.getCartById;
      } catch (error) {
        throw new Error("Failed to fetch cart.");
      }
    }
  },
  Mutation: {
    // Agregar producto al carrito sin necesidad de user_id
    addToCart: async (_, { cart_id, product_id, quantity }) => {
      try {
        // Verificar que el producto existe y tiene stock disponible
        const product = await getProductById(product_id);
        if (!product) {
          throw new Error("❌ Product not found.");
        }
        if (product.stock < quantity) {
          throw new Error("❌ Not enough stock available.");
        }

        // Agregar al carrito en el servicio de Carrito
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { addToCart(cart_id: "${cart_id}", product_id: "${product_id}", quantity: ${quantity}) { id items { product_id quantity name price } } }`
        });

        return response.data.data.addToCart;
      } catch (error) {
        throw new Error("Failed to add to cart.");
      }
    },

    // Eliminar un producto del carrito
    removeFromCart: async (_, { cart_id, product_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { removeFromCart(cart_id: "${cart_id}", product_id: "${product_id}") { id items { product_id quantity name price } } }`
        });

        return response.data.data.removeFromCart;
      } catch (error) {
        throw new Error("Failed to remove from cart.");
      }
    },

    // Vaciar el carrito
    clearCart: async (_, { cart_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { clearCart(cart_id: "${cart_id}") { id items { product_id quantity name price } } }`
        });

        return response.data.data.clearCart;
      } catch (error) {
        throw new Error("Failed to clear cart.");
      }
    }
  }
};


module.exports = resolvers;