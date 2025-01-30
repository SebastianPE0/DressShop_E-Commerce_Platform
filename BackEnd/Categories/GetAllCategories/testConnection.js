const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const testConnection = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a MongoDB Atlas");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Error conectando a MongoDB Atlas:", error);
  }
};

testConnection();
