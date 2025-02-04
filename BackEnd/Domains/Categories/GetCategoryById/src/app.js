const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(express.json()); 
app.use('/category', categoryRoutes); 

module.exports = app;
