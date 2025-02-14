const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const categoryRoutes = require("./src/routes/categoryRoutes");

dotenv.config();

const app = express();


app.use(
    cors({
        origin: "http://3.214.134.68", 
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api", categoryRoutes);

module.exports = app;
