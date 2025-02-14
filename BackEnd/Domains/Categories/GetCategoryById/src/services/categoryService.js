const categoryRepository = require('../repositories/categoryRepository');

const getCategoryById = async (id) => {
    return await categoryRepository.findCategoryById(id);
};

module.exports = { getCategoryById };
