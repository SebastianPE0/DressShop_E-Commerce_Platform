const { gql } = require('apollo-server');

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Query {
    category(id: ID!): Category
  }
`;

module.exports = typeDefs;
