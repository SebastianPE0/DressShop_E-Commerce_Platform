const axios = require('axios');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

const resolvers = {
  Query: {
    getCategoryById: async (_, { id }) => {
      try {
        const response = await axios.get(`${CATEGORY_SERVICE_URL}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
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
  },
};

module.exports = resolvers;
