// middlewares/validateRequest.js
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Errors in validation:", errors);
        res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateRequest };
