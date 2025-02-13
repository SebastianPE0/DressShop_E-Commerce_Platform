const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
require("dotenv").config();

const categoryRoutes = require("./src/routes/categoryRoutes");
const authMiddleware = require("./src/config/authMiddleware");

const app = express();

// Verificar si el middleware de autenticación está bien importado
if (typeof authMiddleware !== "function") {
  console.error("❌ Error: authMiddleware no es una función válida.");
  process.exit(1);
}

// Configurar CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://54.205.137.190",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(bodyParser.json());
app.use(authMiddleware); // ✅ Protege todas las rutas

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/category", categoryRoutes);

const PORT =  80;
app.listen(PORT, () => console.log(`✅ DeleteCategory Service running on port ${PORT}`));

module.exports = app;
