const express = require('express');
const categoryRoutes = require('./src/routes/categoryRoutes');

const app = express();

app.use(express.json()); 
app.use('/category', categoryRoutes); 

module.exports = app;
