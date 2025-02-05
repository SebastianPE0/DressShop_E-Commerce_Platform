const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Definir las rutas
app.use("/category", categoryRoutes);

module.exports = app;
