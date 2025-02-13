require('dotenv').config();

const env = {
    PORT: process.env.PORT || 4000,
    CATEGORY_SERVICE_URL: process.env.CATEGORY_SERVICE_URL || "http://localhost:3000",
    PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || "http://localhost:3001",
    JWT_ISSUER: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_JudMXeuR1",
    JWKS_URI: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_JudMXeuR1/.well-known/jwks.json"
};

module.exports = env;
