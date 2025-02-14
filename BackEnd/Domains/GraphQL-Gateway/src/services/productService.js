const axios = require("axios");


async function getProductsByCategory(categoryId) {
  try {
    console.log(`🔍 Consultando productos con categoryId: ${categoryId}`);
    const response = await axios.get(`http://52.45.86.139:3001/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error en getProductsByCategory:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { getProductsByCategory };
