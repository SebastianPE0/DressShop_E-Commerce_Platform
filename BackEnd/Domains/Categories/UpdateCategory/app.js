const express = require("express");
const cors = require("cors"); // Importar CORS
const categoryRoutes = require("./src/routes/categoryRoutes");
require("./src/config/db"); 

const app = express();

//METODO AÑADIDO
app.use(cors({
    origin: "http://ec2-3-80-74-169.compute-1.amazonaws.com", // Permitir solo el frontend en EC2
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/category", categoryRoutes);

module.exports = app;
