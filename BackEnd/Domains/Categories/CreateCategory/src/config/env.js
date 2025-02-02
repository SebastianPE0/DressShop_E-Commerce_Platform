require('dotenv').config(); // Cargar las variables de entorno

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://mongodb-categories:27017/categories_db',
  appPort: process.env.APP_PORT || 8086,
};

module.exports = config;
