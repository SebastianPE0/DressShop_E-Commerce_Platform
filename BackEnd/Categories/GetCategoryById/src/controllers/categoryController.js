const categoryService = require('../services/categoryService');

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCategoryById,
};
