const express = require('express');
const router = express.Router();
const { deleteCategoryHandler } = require('../controllers/categoryController');

// Ruta para eliminar categoría
router.delete('/category/:id', deleteCategoryHandler);

module.exports = router;
