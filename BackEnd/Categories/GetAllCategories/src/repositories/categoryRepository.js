const Category = require("../models/category");

const getAllCategories = async () => {
  return await Category.find({});
};

module.exports = { getAllCategories };
