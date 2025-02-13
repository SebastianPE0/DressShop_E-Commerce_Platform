const axios = require('axios');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

const getCategoryById = async (id, token) => {
  try {
    console.log(`Fetching category from: ${CATEGORY_SERVICE_URL}/${id}`);

    const response = await axios.get(`${CATEGORY_SERVICE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Pasar el token recibido desde el frontend
      }
    });

    if (response.data) {
      return {
        id: response.data._id, 
        name: response.data.name,
        description: response.data.description,
      };
    }

    return null; 
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error.response?.data || error.message);
    return null;
  }
};

const getProductsByCategory = async (categoryId, token) => {
  try {
    const url = `${PRODUCT_SERVICE_URL}?category_id=${categoryId}`;
    console.log(`🔍 Sending request to: ${url}`);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Pasar el token recibido desde el frontend
      }
    });

    console.log("Response from product service:", response.data);

    return response.data;
  } catch (error) {
    console.error(`Error fetching products by category ${categoryId}:`, error.response?.data || error.message);
    return [];
  }
};

const resolvers = {
  Query: {
    category: async (_, { id }, context) => {
      console.log("🔐 Token recibido:", context.token);  // ✅ Verificar si llega el token
      if (!context.token) {
        throw new Error("Unauthorized: Token is required");
      }
      return await getCategoryById(id, context.token);
    },

    getProductsByCategory: async (_, { categoryId }, context) => {
      console.log("🔐 Token recibido:", context.token);
      if (!context.token) {
        throw new Error("Unauthorized: Token is required");
      }
      return await getProductsByCategory(categoryId, context.token);
    },
  },
};

module.exports = resolvers;
