const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use('/category', categoryRoutes); // Rutas para categorías

module.exports = app;
