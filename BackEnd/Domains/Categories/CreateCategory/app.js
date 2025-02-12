const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authMiddleware = require("./src/config/authMiddleware");
console.log(typeof authMiddleware);
const app = express();

// 📌 Configurar CORS (Permitir solo el frontend en EC2)
app.use(
  cors({
    origin: "http://ec2-3-80-74-169.compute-1.amazonaws.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(bodyParser.json());
app.use(authMiddleware); // Protege todas las rutas


app.use("/category", categoryRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
