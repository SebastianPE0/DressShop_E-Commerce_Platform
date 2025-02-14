const express = require('express');
const { getCategoryById } = require('../controllers/categoryController');

const router = express.Router();
router.get('/category/:id', getCategoryById);

module.exports = router;
