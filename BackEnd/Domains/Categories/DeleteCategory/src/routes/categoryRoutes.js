const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Ruta para eliminar una categoría por ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
