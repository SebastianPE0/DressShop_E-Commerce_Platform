const Category = require('../models/categoryModel');

const deleteCategory = async (categoryId) => {
    const category = await Category.findById(categoryId);
    
    if (!category) {
        throw new Error("La categoría no existe.");
    }

    return await Category.findByIdAndDelete(categoryId);
};

module.exports = { deleteCategory };
