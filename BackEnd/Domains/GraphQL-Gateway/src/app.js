const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
//TEST DEPLOY2
const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
