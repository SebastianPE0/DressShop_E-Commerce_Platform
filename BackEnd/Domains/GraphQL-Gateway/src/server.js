const express = require('express');
const cors = require('cors');
const authMiddleware = require('./config/authMiddleware');
const setupRoutes = require('./routes/routes');
require('./config/env');

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

app.use(authMiddleware);

setupRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`GraphQL-Gateway corriendo en puerto ${PORT}`);
});
