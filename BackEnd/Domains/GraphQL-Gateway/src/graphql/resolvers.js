const axios = require('axios');
const config = require('../config/env');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

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


const CART_SERVICE_URL = process.env.CART_SERVICE_URL; 


const resolvers = {
  Query: {
    category: async (_, { id }) => {
      return await getCategoryById(id);
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
    getCartByUser: async (_, { user_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `query { getCartByUser(user_id: "${user_id}") { id items { product_id quantity } } }`
        });

        return response.data.data.getCartByUser;
      } catch (error) {
        throw new Error("Failed to fetch cart.");
      }
    }
  },
  Mutation: {
    addToCart: async (_, { user_id, product_id, quantity }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { addToCart(user_id: "${user_id}", product_id: "${product_id}", quantity: ${quantity}) { id items { product_id quantity } } }`
        });

        return response.data.data.addToCart;
      } catch (error) {
        throw new Error("Failed to add to cart.");
      }
    },
    removeFromCart: async (_, { user_id, product_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { removeFromCart(user_id: "${user_id}", product_id: "${product_id}") { id items { product_id quantity } } }`
        });

        return response.data.data.removeFromCart;
      } catch (error) {
        throw new Error("Failed to remove from cart.");
      }
    },
    clearCart: async (_, { user_id }) => {
      try {
        const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
          query: `mutation { clearCart(user_id: "${user_id}") { id items { product_id quantity } } }`
        });

        return response.data.data.clearCart;
      } catch (error) {
        throw new Error("Failed to clear cart.");
      }
    }
  },
};

module.exports = resolvers;