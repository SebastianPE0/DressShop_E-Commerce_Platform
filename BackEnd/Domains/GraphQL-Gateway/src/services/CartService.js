const axios = require('axios');
require('dotenv').config();

const CART_SERVICE_URL = process.env.CART_SERVICE_URL;

const CartService = {
  getCartByUser: async (user_id) => {
    try {
      const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
        query: `query { getCartByUser(user_id: "${user_id}") { id items { product_id quantity } } }`
      });
      return response.data.data.getCartByUser;
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      throw new Error("Failed to fetch cart.");
    }
  },

  addToCart: async (user_id, product_id, quantity) => {
    try {
      const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
        query: `mutation { addToCart(user_id: "${user_id}", product_id: "${product_id}", quantity: ${quantity}) { id items { product_id quantity } } }`
      });
      return response.data.data.addToCart;
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      throw new Error("Failed to add to cart.");
    }
  },

  removeFromCart: async (user_id, product_id) => {
    try {
      const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
        query: `mutation { removeFromCart(user_id: "${user_id}", product_id: "${product_id}") { id items { product_id quantity } } }`
      });
      return response.data.data.removeFromCart;
    } catch (error) {
      console.error("Error removing from cart:", error.message);
      throw new Error("Failed to remove from cart.");
    }
  },

  clearCart: async (user_id) => {
    try {
      const response = await axios.post(`${CART_SERVICE_URL}/graphql`, {
        query: `mutation { clearCart(user_id: "${user_id}") { id items { product_id quantity } } }`
      });
      return response.data.data.clearCart;
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      throw new Error("Failed to clear cart.");
    }
  }
};

module.exports = CartService;
