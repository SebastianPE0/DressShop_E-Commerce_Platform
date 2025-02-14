const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./src/routes/categoryRoutes");
const authMiddleware = require("./src/config/authMiddleware"); 

const app = express();

//TEST2
if (typeof authMiddleware !== "function") {
  console.error("Error: authMiddleware no es una función válida.");
  process.exit(1); 
}

//TEST
app.use(
  cors({
    origin: "http://3.214.134.68",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 📌 Middlewares
app.use(express.json()); 
app.use(authMiddleware); 

app.use("/categories", categoryRoutes);


const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
