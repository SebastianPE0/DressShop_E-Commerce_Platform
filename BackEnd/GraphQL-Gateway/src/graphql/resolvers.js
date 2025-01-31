const axios = require('axios');
const config = require('../config/env');

const getCategoryById = async (id) => {
  try {
    console.log(`Fetching category from: ${config.categoryServiceURL}/${id}`); // Debug
    const response = await axios.get(`${config.categoryServiceURL}/${id}`);

    // Mapeo de `_id` a `id` para GraphQL
    if (response.data) {
      return {
        id: response.data._id, // Mapea el campo _id a id
        name: response.data.name,
      };
    }

    return null; // Si no encuentra la categoría
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return null;
  }
};

const resolvers = {
  Query: {
    category: async (_, { id }) => {
      return await getCategoryById(id);
    },
  },
};

module.exports = resolvers;
