const express = require("express");
//AÑADIDO
const cors = require("cors"); // Importar CORS

const categoryRoutes = require("./src/routes/categoryRoutes");

const app = express();
//METODO AÑADIDO
app.use(cors({
    origin: "http://ec2-54-242-43-40.compute-1.amazonaws.com", // Permitir solo el frontend en EC2
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/categories", categoryRoutes);

module.exports = app;
