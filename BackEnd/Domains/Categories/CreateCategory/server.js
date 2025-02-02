const app = require('./app');
const connectDB = require('./src/config/db');
const config = require('./src/config/env'); // Importar configuración centralizada

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(config.appPort, () => {
  console.log(`CreateCategory service running on port ${config.appPort}`);
});
