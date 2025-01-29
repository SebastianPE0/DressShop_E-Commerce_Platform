const categoryRepository = require('../repositories/categoryRepository');

const getCategoryById = async (id) => {
  if (!id || id.trim() === '') {
    throw new Error('Category ID is required');
  }

  const category = await categoryRepository.findCategoryById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};

module.exports = {
  getCategoryById,
};
