require("dotenv").config();

const config = {
  port: process.env.APP_PORT || 80,
  mongoUri: process.env.MONGO_URI,
  graphqlUrl: process.env.GRAPHQL_SERVICE_URL || "ec2-18-204-19-80.compute-1.amazonaws.com/graphql"
};

// Mensaje de advertencia si faltan variables de entorno
if (!process.env.GRAPHQL_SERVICE_URL) {
  console.warn("⚠️  WARNING: GRAPHQL_SERVICE_URL no está definida en el archivo .env. Usando valor por defecto.");
}

module.exports = config;
