const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');

const router = express.Router();

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    return server;
}

async function setupRoutes(app) {
    const server = await startApolloServer();
    server.applyMiddleware({ app, path: '/graphql' });

    router.get('/', (req, res) => res.send('GraphQL Gateway activo'));
    app.use(router);
}

module.exports = setupRoutes;
