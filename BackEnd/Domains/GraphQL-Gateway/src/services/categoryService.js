const axios = require('axios');


async function getCategoryById(id) {
    try {
        console.log(`🔍 Enviando petición a GetCategoryById con ID: ${id}`);

        const response = await axios.get(`http://44.199.160.220:3000/api/category/${id}`);

        console.log("🔍 Respuesta de GetCategoryById:", response.data);

        return response.data;
    } catch (error) {
        console.error("❌ Error en consulta a GetCategoryById:", error.response?.data || error.message);
        return null;
    }
}

module.exports = { getCategoryById };