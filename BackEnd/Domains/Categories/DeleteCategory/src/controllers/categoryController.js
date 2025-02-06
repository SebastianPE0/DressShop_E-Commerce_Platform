const categoryService = require('../services/categoryService');

// Controlador para eliminar una categoría
const deleteCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { deleteCategoryHandler };
