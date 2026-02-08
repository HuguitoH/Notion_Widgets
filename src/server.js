// src/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno del archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS (necesario para que Notion embed funcione)
app.use(cors());
app.use(express.json());

// Importar rutas de LeetCode (las crearemos a continuación)
const leetCodeRoutes = require('./routes/leetCodeRoutes');
app.use('/api/leetcode', leetCodeRoutes);

// Ruta de bienvenida simple para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('API de Widgets de Notion funcionando.');
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
