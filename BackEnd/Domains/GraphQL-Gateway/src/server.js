const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const authMiddleware = require("./config/authMiddleware"); 

async function startServer() {
  const app = express();

 
  app.use(
    cors({
      origin: "http://54.205.137.190",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  
  app.use(authMiddleware);

  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { user: req.user }; 
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // 📌 Configurar puerto dinámico
  const PORT = 80 ;
  app.listen(PORT, () => {
    console.log(`✅ GraphQL-Gateway ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();