require('dotenv').config();

const config = {
  categoryServiceURL: process.env.CATEGORY_SERVICE_URL || 'http://get-category-by-id:8087/category',
  appPort: process.env.APP_PORT || 8080,
};

console.log("🔍 GraphQL Gateway Config:", config); // Debug

module.exports = config;
