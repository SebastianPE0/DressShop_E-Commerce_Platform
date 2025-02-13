const axios = require("axios");

const env = require('../config/env');


async function getProductsByCategory(categoryId) {
  try {
    console.log(`🔍 Consultando productos con categoryId: ${categoryId}`);
    const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error en getProductsByCategory:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { getProductsByCategory };
