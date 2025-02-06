const axios = require('axios');
const Category = require('../models/category');

// Obtener la URL del GraphQL-Gateway desde el entorno
const GRAPHQL_SERVICE_URL = process.env.GRAPHQL_SERVICE_URL || "ec2-18-204-19-80.compute-1.amazonaws.com/graphql";

// Verifica si hay productos en la categoría antes de eliminarla
const checkProductsInCategory = async (categoryId) => {
    const query = {
        query: `
            query GetProductsByCategory($categoryId: ID!) {
                getProductsByCategory(categoryId: $categoryId) {
                    id
                }
            }
        `,
        variables: { categoryId }
    };

    try {
        const response = await axios.post(GRAPHQL_SERVICE_URL, query);
        const products = response.data.data.getProductsByCategory;
        
        return products.length > 0; // Devuelve `true` si hay productos en la categoría
    } catch (error) {
        console.error("Error al consultar GraphQL-Gateway:", error.response?.data || error.message);
        throw new Error("No se pudo verificar si la categoría tiene productos asociados.");
    }
};

// Elimina una categoría si no tiene productos asociados
const deleteCategory = async (categoryId) => {
    const hasProducts = await checkProductsInCategory(categoryId);

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
