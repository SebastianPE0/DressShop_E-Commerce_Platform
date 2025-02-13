const categoryService = require('../services/categoryService');

const resolvers = {
    Query: {
        getCategoryById: async (_, { id }) => {
            console.log(`🔍 Buscando categoría en GraphQL para ID: ${id}`);
            
            const category = await categoryService.getCategoryById(id);

            if (!category) {
                console.log("❌ No se encontró la categoría.");
                return null;
            }

            console.log("🔍 Categoría encontrada en GraphQL:", category);

            // Convertimos _id de MongoDB a id para GraphQL
            return {
                id: category._id.toString(), // Transformar ObjectId a String
                name: category.name,
                description: category.description,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt
            };
        },
    },
};

module.exports = resolvers;
