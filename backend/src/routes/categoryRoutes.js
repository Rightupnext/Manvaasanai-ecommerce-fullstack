const express = require('express');
const { addCategory, getAllCategories, deleteCategory,updateCategory } = require('../controllers/categoryController');

const router = express.Router();

// Category Routes
router.post('/', addCategory);
router.get('/', getAllCategories);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory); 

module.exports = router;
