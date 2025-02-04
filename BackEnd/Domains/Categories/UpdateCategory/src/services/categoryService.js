const categoryRepository = require("../repositories/categoryRepository");

const updateCategory = async (id, updateData) => {
    const existingCategory = await categoryRepository.findCategoryById(id);

    if (!existingCategory) {
        throw new Error("Category not found");
    }

    return await categoryRepository.updateCategory(id, updateData);
};

module.exports = {
    updateCategory,
};
