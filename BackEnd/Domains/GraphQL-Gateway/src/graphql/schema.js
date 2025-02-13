const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        id: ID!             # Usamos 'id', no '_id'
        name: String!
        description: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        getCategoryById(id: ID!): Category
    }
`;

module.exports = typeDefs;
