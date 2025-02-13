const categoryService = require('../services/categoryService');
const productService = require('../services/productService');

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
    getProductsByCategory: async (_, { categoryId }) => {
      console.log(`🔍 Buscando productos en GraphQL para categoryId: ${categoryId}`);

      if (!categoryId) {
        console.log("❌ categoryId no proporcionado.");
        return null;
      }

      const response = await productService.getProductsByCategory(categoryId);

      if (!response || !response.products || response.products.length === 0) {
          console.log("❌ No se encontraron productos.");
          return [];
      }

      console.log("🔍 Productos encontrados en GraphQL:", response.products);

      return response.products.map(product => ({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          stock: product.stock,
          categoryid: product.category_id
      }));
    },
  },
};

module.exports = resolvers;