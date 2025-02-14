const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: String
    name: String
    price: Float
    stock: Int
    categoryid: String
  }

  type Category {
    id: ID!             # Usamos 'id', no '_id'
    name: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCategoryById(id: ID!): Category
    getProductsByCategory(categoryId: String!): [Product]
  }

`;

module.exports = typeDefs;
