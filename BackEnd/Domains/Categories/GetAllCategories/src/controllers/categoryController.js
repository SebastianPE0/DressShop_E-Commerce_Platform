const categoryService = require("../services/categoryService");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllCategories };
