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
    name: String  
    price: Float  
  }

 type Cart {
    id: ID!
    items: [CartItem]!
  }


  type Query {
    getProductById(id: ID!): Product  # Nuevo: Obtener detalles de un producto por ID
    getProductsByCategory(categoryId: ID!): [Product] 
    getCartById(cart_id: ID!): Cart
  }
    
  type Mutation {
    addToCart(cart_id: ID!, product_id: ID!, quantity: Int!): Cart
    removeFromCart(cart_id: ID!, product_id: ID!): Cart
    clearCart(cart_id: ID!): Cart
  }
`;

module.exports = typeDefs;
