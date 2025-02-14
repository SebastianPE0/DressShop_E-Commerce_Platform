const axios = require('axios');

const CATEGORY_SERVICE_URL = "ec2-44-204-88-189.compute-1.amazonaws.com";

async function getCategoryById(id) {
    try {
        console.log(`🔍 Enviando petición a GetCategoryById con ID: ${id}`);

        const response = await axios.get(`http://ec2-44-204-88-189.compute-1.amazonaws.com:3001/api/category/${id}`);

        console.log("🔍 Respuesta de GetCategoryById:", response.data);

        return response.data;
    } catch (error) {
        console.error("❌ Error en consulta a GetCategoryById:", error.response?.data || error.message);
        return null;
    }
}

module.exports = { getCategoryById };