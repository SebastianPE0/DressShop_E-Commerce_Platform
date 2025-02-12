require("dotenv").config(); // ✅ Cargar variables de entorno correctamente
const mongoose = require("mongoose");

// Obtener URI de MongoDB desde variables de entorno
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Error: MONGO_URI no está definido en el archivo .env");
  process.exit(1);
}

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connect to Mongo Succesfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
