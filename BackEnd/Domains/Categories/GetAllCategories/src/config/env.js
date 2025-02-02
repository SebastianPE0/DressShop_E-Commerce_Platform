require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/categories_db",
  appPort: process.env.APP_PORT || 80,
};
