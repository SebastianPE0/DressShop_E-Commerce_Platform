require("dotenv").config();

const config = {
  port: process.env.APP_PORT || 80,
  mongoUri: process.env.MONGO_URI,
  graphqlUrl: process.env.GRAPHQL_URL
};

module.exports = config;
