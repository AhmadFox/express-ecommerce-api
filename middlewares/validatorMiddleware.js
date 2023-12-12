const { validationResult } = require('express-validator');

// Find the validation errors in this requist and maps them in an object with handy function:
const validateorMiddleware = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next(); // Very important to add next in case invalid category id
}

module.exports = validateorMiddleware;