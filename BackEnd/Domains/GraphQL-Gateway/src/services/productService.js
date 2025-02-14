const axios = require("axios");

const env = require('../config/env');
const PRODUCT_SERVICE_URL="http://ec2-44-204-88-189.compute-1.amazonaws.com:3001"

async function getProductsByCategory(categoryId) {
  try {
    console.log(`🔍 Consultando productos con categoryId: ${categoryId}`);
    const response = await axios.get(`http://ec2-44-204-88-189.compute-1.amazonaws.com:3001/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error en getProductsByCategory:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { getProductsByCategory };
