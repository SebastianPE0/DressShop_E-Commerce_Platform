const axios = require("axios");
const categoryRepository = require("../repositories/categoryRepository");
const productRepository = require("../repositories/productRepository");

const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://graphql-gateway:80/graphql";

const deleteCategory = async (id) => {
    //  Verificar si la categoría existe consultando GraphQL Gateway
    const query = `
        query {
            getCategoryById(id: "${id}") {
                id
                name
            }
        }
    `;

    try {
        const response = await axios.post(GRAPHQL_URL, { query });

        // Si GraphQL no encuentra la categoría, devuelve error
        if (!response.data.data.getCategoryById) {
            throw new Error("Category not found");
        }
    } catch (error) {
        throw new Error("Error querying GraphQL: " + error.message);
    }

    // Verificar si hay productos asociados a la categoría
    const product = await productRepository.findProductsByCategoryId(id);
    if (product) {
        throw new Error("Cannot delete category. There are products associated with this category.");
    }

    //  Eliminar la categoría
    return await categoryRepository.deleteCategory(id);
};

module.exports = {
    deleteCategory,
};
