const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Ruta para obtener categoría por ID
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
