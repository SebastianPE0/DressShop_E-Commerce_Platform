const Category = require('../models/category');

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

module.exports = {
  createCategory,
};
