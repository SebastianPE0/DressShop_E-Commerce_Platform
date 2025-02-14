const app = require('./app');
const connectDB = require('./src/config/db');

// 📌 Verificar si `MONGO_URI` está bien definida
if (!process.env.MONGO_URI) {
  console.error(" Error: MONGO_URI no está definida.");
  process.exit(1);
}

// Conectar a la base de datos
connectDB().then(() => {
  // Iniciar el servidor después de la conexión a MongoDB
  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => {
    console.log(` CreateCategory service running on port ${PORT}`);
  });
}).catch(err => {
  console.error(" No se pudo conectar a MongoDB:", err);
  process.exit(1);
});
