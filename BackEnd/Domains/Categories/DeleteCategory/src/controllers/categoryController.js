const categoryService = require("../services/categoryService");

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await categoryService.deleteCategory(id);

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(400).json({ message: error.message });
    }
};
