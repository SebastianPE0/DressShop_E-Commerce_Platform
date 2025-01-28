const categoryRepository = require('../repositories/categoryRepository');

const createCategory = async (name) => {
  if (!name || name.trim() === '') {
    throw new Error('Category name is required');
  }

  try {
    return await categoryRepository.createCategory({ name });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Category name must be unique');
    }
    throw new Error('Database error');
  }
};

module.exports = {
  createCategory,
};
