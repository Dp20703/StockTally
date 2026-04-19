const { body } = require('express-validator');

module.exports.validateRegister = [
    body('userName')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.'),
    body('fullName.firstName')
        .notEmpty().withMessage('First name is required.')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

module.exports.validateLogin = [
    body('email')
        .isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

module.exports.validateGoogleAuth = [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('name').notEmpty().withMessage('Name is required.'),
];

module.exports.validateUpdateProfile = [
    body('userName')
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('fullName.firstName')
        .notEmpty().withMessage('First name is required.')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long.'),
];