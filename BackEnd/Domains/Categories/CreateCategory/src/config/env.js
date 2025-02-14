require('dotenv').config(); // Upload enviroment variables

const config = {
  mongoURI: process.env.MONGO_URI ,
  appPort: process.env.APP_PORT || 5010,
};

module.exports = config;
