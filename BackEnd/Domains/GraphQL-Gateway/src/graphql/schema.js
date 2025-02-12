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
  

  type CartItem {
    id: ID!
    product_id: ID!
    quantity: Int!
  }

  type Cart {
    id: ID!
    user_id: ID!
    items: [CartItem]!
  }


  type Query {
    category(id: ID!): Category
    getProductsByCategory(categoryId: ID!): [Product]  # Nueva consulta
    getCartByUser(user_id: ID!): Cart
  }
    
  type Mutation {
    addToCart(user_id: ID!, product_id: ID!, quantity: Int!): Cart
    removeFromCart(user_id: ID!, product_id: ID!): Cart
    clearCart(user_id: ID!): Cart
  }
`;

module.exports = typeDefs;
