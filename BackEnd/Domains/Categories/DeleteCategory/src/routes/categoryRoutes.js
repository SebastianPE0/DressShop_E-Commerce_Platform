const express = require('express');
const router = express.Router();
const { deleteCategoryHandler } = require('../controllers/categoryController');

// Ruta para eliminar categoría
router.delete('/:id', deleteCategoryHandler);

module.exports = router;
