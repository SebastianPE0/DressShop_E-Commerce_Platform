require('dotenv').config(); // Upload enviroment variables

const config = {
  mongoURI: process.env.MONGO_URI ,
  appPort:  5010,
};

module.exports = config;
