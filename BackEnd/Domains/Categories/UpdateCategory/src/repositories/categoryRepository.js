const Category = require("../models/category");

const findCategoryById = async (id) => {
    return await Category.findById(id);
};

const updateCategory = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
    findCategoryById,
    updateCategory,
};
