const app = require('./app');
const connectDB = require('./src/config/db');
const config = require('./src/config/env'); // Importar configuración centralizada

// Connect to DB
connectDB();

// start server
app.listen(config.appPort, () => {
  console.log(`CreateCategory service running on port ${config.appPort}`);
});
