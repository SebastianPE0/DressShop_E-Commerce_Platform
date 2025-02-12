const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const authMiddleware = require("./config/authMiddleware"); 

const app = express();


if (typeof authMiddleware !== "function") {
  console.error(" Error: authMiddleware no es una función válida.");
  process.exit(1); 
}


app.use(
  cors({
    origin: "http://ec2-3-80-74-169.compute-1.amazonaws.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(express.json()); 
app.use(authMiddleware); 


app.use("/category", categoryRoutes);

module.exports = app;
