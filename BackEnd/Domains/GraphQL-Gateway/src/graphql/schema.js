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

  type Cart {
    cart_id: ID!
    products: [Product!]!
    created_at: String!
  }

  type Query {
    category(id: ID!): Category
    getProductsByCategory(categoryId: ID!): [Product]
    getProductById(productId: ID!): Product 
  }

  type Mutation {
    addProductToCart(cart_id: ID!, product_id: ID!, quantity: Int!): Cart  
  }
`;

module.exports = typeDefs;
