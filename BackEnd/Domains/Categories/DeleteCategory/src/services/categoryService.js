const axios = require("axios");
const Category = require("../models/category");

const GRAPHQL_SERVICE_URL = process.env.GRAPHQL_SERVICE_URL || "http://localhost:4000/graphql";

// Verifica si hay productos en la categoría antes de eliminarla
const checkProductsInCategory = async (categoryId, token) => {
    if (!token) {
        throw new Error("Token de autenticación no proporcionado.");
    }

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
                "Authorization": token, // ✅ Se envía el token correctamente
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
    if (!categoryId) {
        throw new Error("ID de categoría no proporcionado.");
    }

    const hasProducts = await checkProductsInCategory(categoryId, token);

    if (hasProducts) {
        throw new Error("No se puede eliminar la categoría porque tiene productos asignados.");
    }

    // Verifica si la categoría existe
    const category = await Category.findById(categoryId);
    if (!category) {
        throw new Error("Categoría no encontrada.");
    }

    await Category.findByIdAndDelete(categoryId);
    return { message: "Categoría eliminada exitosamente." };
};

module.exports = { deleteCategory };
