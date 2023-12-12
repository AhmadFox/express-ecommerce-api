const validateorMiddleware = require('../../middlewares/validatorMiddleware');

const { check } = require('express-validator');

exports.getCategoryValidator = [
	check('id').isMongoId().withMessage('Invalid category id format'),
	validateorMiddleware
];

exports.createCategoryValidator = [
	check('name')
		.notEmpty()
		.withMessage('Category name is required!')
		.isLength({ min: 3 })
		.withMessage('Too short category name')
		.isLength({ max: 32 })
		.withMessage('Too long category name'),
	validateorMiddleware
];

exports.updateCategoryValidator = [
	check('id').isMongoId().withMessage('Invalid category id format'),
	validateorMiddleware
];

exports.deleteCategoryValidator = [
	check('id').isMongoId().withMessage('Invalid category id format'),
	validateorMiddleware
];