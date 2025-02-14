const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();

const app = express();

// Configurar CORS
app.use(
    cors({
        origin: "http://3.214.134.68",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar rutas
app.use('/api', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ GetCategoryById corriendo en puerto ${PORT}`);
});
