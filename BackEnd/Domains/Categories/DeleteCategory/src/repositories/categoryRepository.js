const Category = require("../models/category");

const findCategoryById = async (id) => {
  return await Category.findById(id);
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = { findCategoryById, deleteCategory };
