const categoryRepository = require("../repositories/categoryRepository");

const getCategories = async () => {
  return await categoryRepository.getAllCategories();
};

module.exports = { getCategories };
