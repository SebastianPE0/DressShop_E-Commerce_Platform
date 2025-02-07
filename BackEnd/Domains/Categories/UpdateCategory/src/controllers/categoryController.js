const categoryService = require("../services/categoryService");

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedCategory = await categoryService.updateCategory(id, updateData);

        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
