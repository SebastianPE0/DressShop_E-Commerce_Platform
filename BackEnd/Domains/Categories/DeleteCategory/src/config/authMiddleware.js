const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_JudMXeuR1/.well-known/jwks.json`,
});

async function getKey(header, callback) {
  try {
    const key = await client.getSigningKey(header.kid);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  } catch (error) {
    console.error("❌ Error obteniendo la clave de firma:", error);
    callback(error);
  }
}

// Middleware de autenticación
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) {
      console.error("❌ Error verificando token:", err.message);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    
    // Almacenar la información del usuario en la solicitud
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
