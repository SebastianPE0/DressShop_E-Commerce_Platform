const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./src/routes/categoryRoutes");
require("./src/config/db"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use("/category", categoryRoutes);

module.exports = app;
