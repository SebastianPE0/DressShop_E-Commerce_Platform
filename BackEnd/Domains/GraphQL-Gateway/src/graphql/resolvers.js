const axios = require('axios');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

const resolvers = {
  Query: {
    getCategoryById: async (_, { id }) => {
      try {
        console.log(`Requesting category from: ${CATEGORY_SERVICE_URL}/category/${id}`);
        const response = await axios.get(`${CATEGORY_SERVICE_URL}/category/${id}`);

        const category = response.data;
        console.log(`Response from category service:`, category);

        return {
          id: category._id,  // Convertimos _id a id
          name: category.name
        };
      } catch (error) {
        console.error("Error fetching category by ID:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch category.");
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
