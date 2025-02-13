const categoryService = require('../services/categoryService');

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.json(category);
    } catch (error) {
        console.error("Error al obtener categoría:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { getCategoryById };
