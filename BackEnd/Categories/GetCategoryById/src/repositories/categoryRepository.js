const Category = require('../models/category');

// Buscar categoría por ID
const findCategoryById = async (id) => {
  return await Category.findById(id);
};

module.exports = {
  findCategoryById,
};
