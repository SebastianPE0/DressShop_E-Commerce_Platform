const axios = require("axios");
const categoryRepository = require("../repositories/categoryRepository");

const GRAPHQL_URL = process.env.GRAPHQL_GATEWAY_URL;

const checkProductsInCategory = async (categoryId) => {
  try {
    const response = await axios.post(GRAPHQL_URL, {
      query: `query { getProductsByCategory(categoryId: "${categoryId}") { id } }`,
    });

    const products = response.data.data.getProductsByCategory;
    return products && products.length > 0;
  } catch (error) {
    console.error("❌ Error en checkProductsInCategory:", error);
    return false;
  }
};

const deleteCategory = async (categoryId) => {
  const categoryExists = await categoryRepository.findCategoryById(categoryId);
  if (!categoryExists) {
    throw new Error("Categoría no encontrada");
  }

  const hasProducts = await checkProductsInCategory(categoryId);
  if (hasProducts) {
    throw new Error("No se puede eliminar la categoría porque tiene productos asignados.");
  }

  return await categoryRepository.deleteCategory(categoryId);
};

module.exports = { deleteCategory };
