const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Ruta para obtener todas las categorías
router.get("/", categoryController.getAllCategories);

module.exports = router;
