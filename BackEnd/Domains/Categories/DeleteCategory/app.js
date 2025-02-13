const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // ✅ Importado correctamente
const connectDB = require("./src/config/db");
require("dotenv").config();

const categoryRoutes = require("./src/routes/categoryRoutes");
const authMiddleware = require("./src/config/authMiddleware");

const app = express();

if (typeof authMiddleware !== "function") {
  console.error("❌ Error: authMiddleware no es una función válida.");
  process.exit(1); // Detener ejecución si hay un problema con el middleware
}
//TEST

app.use(
  cors({
    origin: "http://54.205.137.190",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(bodyParser.json()); 
app.use(authMiddleware); // ✅ Protege todas las rutas


connectDB();


app.use("/category", categoryRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
