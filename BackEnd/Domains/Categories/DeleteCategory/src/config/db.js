const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect succesfully to MongoDB Atlas");
  } catch (error) {
    console.error("Error to connect MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
