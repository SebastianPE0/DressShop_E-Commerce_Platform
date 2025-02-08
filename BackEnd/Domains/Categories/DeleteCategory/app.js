const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const cors = require("cors"); // Importar CORS
require("dotenv").config();

const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();
//METODO AÑADIDO
app.use(cors({
    origin: "http://ec2-3-80-74-169.compute-1.amazonaws.com", // Permitir solo el frontend en EC2
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Definir las rutas
app.use("/category", categoryRoutes);

module.exports = app;
