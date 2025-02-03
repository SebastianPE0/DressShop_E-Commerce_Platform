require('dotenv').config(); // Upload enviroment variables

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://mongodb-categories:27017/categories_db',
  appPort: process.env.APP_PORT || 80,
};

module.exports = config;
