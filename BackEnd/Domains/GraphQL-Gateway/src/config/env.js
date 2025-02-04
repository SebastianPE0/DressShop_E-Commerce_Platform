require('dotenv').config();

const config = {
  categoryServiceURL: process.env.CATEGORY_SERVICE_URL || 'http://ec2-54-175-208-181.compute-1.amazonaws.com/category',
  appPort: process.env.APP_PORT || 80,
};

console.log("GraphQL Gateway Config:", config); // Debug

module.exports = config;
