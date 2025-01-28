require('dotenv').config(); // Cargar las variables de entorno desde .env

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/category_db',
  appPort: process.env.APP_PORT || 8086,
};

module.exports = config;
