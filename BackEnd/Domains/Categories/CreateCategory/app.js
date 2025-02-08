const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors"); // Importar CORS
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();

//METODO AÑADIDO
app.use(cors({
    origin: "http://ec2-3-80-74-169.compute-1.amazonaws.com", // Permitir solo el frontend en EC2
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/category', categoryRoutes);

module.exports = app;
