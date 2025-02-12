const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    category_id: String!
  }
  
  type Query {
    category(id: ID!): Category
    getProductsByCategory(categoryId: ID!): [Product]  # Nueva consulta
  }
`;

module.exports = typeDefs;
