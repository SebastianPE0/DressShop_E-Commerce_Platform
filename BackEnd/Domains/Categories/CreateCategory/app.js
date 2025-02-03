const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/category', categoryRoutes);

module.exports = app;
