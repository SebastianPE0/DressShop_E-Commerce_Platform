const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRoutes = require("./src/routes/categoryRoutes");
//TEST2
dotenv.config();

const app = express();

// 🔹 Configurar TEST
app.use(
    cors({
        origin: "http://3.214.134.68", // URL del frontend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api", categoryRoutes);

module.exports = app;
