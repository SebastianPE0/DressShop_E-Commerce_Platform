const app = require('./app');
const connectDB = require('./src/config/db');


if (!process.env.MONGO_URI) {
  console.error(" Error: MONGO_URI no está definida.");
  process.exit(1);
}


connectDB().then(() => {
  
  const PORT = process.env.PORT || 5004;
  app.listen(PORT, () => {
    console.log(` CreateCategory service running on port ${PORT}`);
  });
}).catch(err => {
  console.error(" No se pudo conectar a MongoDB:", err);
  process.exit(1);
});
