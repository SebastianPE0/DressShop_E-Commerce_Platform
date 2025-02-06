const axios = require('axios');
require('dotenv').config(); // Importamos dotenv para cargar las variables de entorno

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL ;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL ;

const resolvers = {
  Query: {
    getCategoryById: async (_, { id }) => {
      try {
        const response = await axios.get(`${CATEGORY_SERVICE_URL}/category/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    },
    getProductsByCategory: async (_, { categoryId }) => {
      try {
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/by-category?category_id=${categoryId}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    },
  },
};

module.exports = resolvers;
