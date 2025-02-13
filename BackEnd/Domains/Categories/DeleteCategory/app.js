const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRoutes = require("./src/routes/categoryRoutes");
//TEST
dotenv.config();

const app = express();

// 🔹 Configurar CORS
app.use(
    cors({
        origin: "http://54.205.137.190", // URL del frontend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api", categoryRoutes);

module.exports = app;
