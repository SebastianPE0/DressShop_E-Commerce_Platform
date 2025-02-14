require('dotenv').config(); // Upload enviroment variables

const config = {
  mongoURI: process.env.MONGO_URI ,
  appPort:  5004,
};

module.exports = config;
