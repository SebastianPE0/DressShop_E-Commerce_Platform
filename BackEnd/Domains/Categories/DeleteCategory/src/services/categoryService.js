const axios = require("axios");
const Category = require("../models/category");

const GRAPHQL_SERVICE_URL = process.env.GRAPHQL_SERVICE_URL;

// Verifica si hay productos en la categoría antes de eliminarla
const checkProductsInCategory = async (categoryId, token) => {
    const query = {
        query: `
            query GetProductsByCategory($categoryId: ID!) {
                getProductsByCategory(categoryId: $categoryId) {
                    id
                }
            }
        `,
        variables: { categoryId },
    };

    try {
        const response = await axios.post(GRAPHQL_SERVICE_URL, query, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // ✅ Se envía el token
            },
        });

        const products = response.data.data?.getProductsByCategory || [];
        return products.length > 0;
    } catch (error) {
        console.error("❌ Error al consultar GraphQL-Gateway:", error.response?.data || error.message);
        throw new Error("No se pudo verificar si la categoría tiene productos asociados.");
    }
};

// Elimina una categoría si no tiene productos asociados
const deleteCategory = async (categoryId, token) => {
    const hasProducts = await checkProductsInCategory(categoryId, token);

    if (hasProducts) {
        throw new Error("No se puede eliminar la categoría porque tiene productos asignados.");
    }

    // Si no hay productos, eliminar la categoría
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        throw new Error("Categoría no encontrada.");
    }

    return { message: "Categoría eliminada exitosamente" };
};

module.exports = { deleteCategory };
