const axios = require('axios');
require('dotenv').config();

const CATEGORY_SERVICE_URL = process.env.CATEGORY_SERVICE_URL;

// Función para obtener una categoría por ID
const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${CATEGORY_SERVICE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return null; // Si la categoría no existe, devolver null
  }
};

module.exports = { getCategoryById };
