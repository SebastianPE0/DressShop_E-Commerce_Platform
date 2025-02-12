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
    name: String  # Nuevo: Para mostrar el nombre del producto en el carrito
    price: Float  # Nuevo: Para mostrar el precio del producto en el carrito
  }

 type Cart {
    id: ID!
    user_id: String!  # Cambiado a String para mayor flexibilidad
    items: [CartItem]!
  }


  type Query {
    getProductById(id: ID!): Product  # Nuevo: Obtener detalles de un producto por ID
    getProductsByCategory(categoryId: ID!): [Product] 
    getCartByUser(user_id: String!): Cart
  }
    
  type Mutation {
    addToCart(user_id: ID!, product_id: ID!, quantity: Int!): Cart
    removeFromCart(user_id: ID!, product_id: ID!): Cart
    clearCart(user_id: ID!): Cart
  }
`;

module.exports = typeDefs;
