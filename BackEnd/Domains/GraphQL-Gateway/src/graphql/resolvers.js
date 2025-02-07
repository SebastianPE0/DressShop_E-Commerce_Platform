const axios = require('axios');
const config = require('../config/env');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

const resolvers = {
  Query: {
    getCategoryById: async (_, { id }) => {
      try {
        console.log(`Fetching category from: ${config.CATEGORY_SERVICE_URL}/${id}`); // Debug
        const response = await axios.get(`${config.CATEGORY_SERVICE_URL}/${id}`);


        if (response.data) {
          return {
            id: response.data._id, // Mapea el campo _id a id
            name: response.data.name,
            description: response.data.description,
          };
        }

        return null; // Si no encuentra la categoría
        
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
