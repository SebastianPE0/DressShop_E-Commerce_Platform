const axios = require('axios');
const env = require('../config/env');

async function getCategoryById(id) {
    try {
        console.log(`🔍 Enviando petición a GetCategoryById con ID: ${id}`);

        const response = await axios.get(`${env.CATEGORY_SERVICE_URL}/api/category/${id}`);

        console.log("🔍 Respuesta de GetCategoryById:", response.data);

        return response.data;
    } catch (error) {
        console.error("❌ Error en consulta a GetCategoryById:", error.response?.data || error.message);
        return null;
    }
}

module.exports = { getCategoryById };
