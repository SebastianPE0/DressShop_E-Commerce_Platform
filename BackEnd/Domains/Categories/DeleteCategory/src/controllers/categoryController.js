const categoryService = require('../services/categoryService');

// Controlador para eliminar una categoría
const deleteCategoryHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization; // Se obtiene el token del header

        if (!id) {
            return res.status(400).json({ error: "ID de categoría no proporcionado." });
        }

        if (!token) {
            return res.status(401).json({ error: "No se proporcionó un token JWT." });
        }

        const result = await categoryService.deleteCategory(id, token);
        res.status(200).json(result);
    } catch (error) {
        console.error("❌ Error en deleteCategoryHandler:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { deleteCategoryHandler };
