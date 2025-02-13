const express = require("express");
const { deleteCategory } = require("../controllers/categoryController");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

router.delete("/categories/:id", authMiddleware, deleteCategory);

module.exports = router;
