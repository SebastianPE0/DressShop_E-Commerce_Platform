const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    return res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
};
