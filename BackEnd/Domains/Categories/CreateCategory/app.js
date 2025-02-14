const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authMiddleware = require("./src/config/authMiddleware");
console.log(typeof authMiddleware);

require("dotenv").config();

const app = express();

// 📌 Configurar CORS (Permitir solo el frontend en EC2)
app.use(
  cors({
    origin: "http://3.214.134.68",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(authMiddleware); // Protege todas las rutas
app.use("/category", categoryRoutes);

// 📌 Asegurar que `PORT` tenga un valor por defecto
const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
