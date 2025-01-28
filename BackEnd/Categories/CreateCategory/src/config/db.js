const mongoose = require('mongoose');
const config = require('./env'); // Importar configuración centralizada

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB at:', config.mongoURI); // Para depuración
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
