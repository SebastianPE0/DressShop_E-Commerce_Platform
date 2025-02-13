const Category = require('../models/category');

const findCategoryById = async (id) => {
    return await Category.findById(id);
};

module.exports = { findCategoryById };
