const express = require('express');

const { 
	getCategories, 
	createCategory, 
	getCategorie, 
	updateCategory,
	deleteCategory
} = require('../services/categoryService');

const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategorie);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;