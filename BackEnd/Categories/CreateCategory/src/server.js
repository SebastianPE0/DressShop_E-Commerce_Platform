const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env'); // Importar configuración centralizada

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(config.appPort, () => {
  console.log(`CreateCategory service running on port ${config.appPort}`);
});
