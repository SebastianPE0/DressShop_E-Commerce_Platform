const express = require('express');
const cors = require('cors');
const authMiddleware = require('./config/authMiddleware');
const setupRoutes = require('./routes/routes');
require('./config/env');

const app = express();

app.use(
    cors({
        origin: "http://54.205.137.190",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Aplicar autenticación a las rutas protegidas
app.use(authMiddleware);

setupRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`GraphQL-Gateway corriendo en puerto ${PORT}`);
});
