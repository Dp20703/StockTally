const { body } = require('express-validator');

// Sanitizer: treat empty string / null as absent so .optional() kicks in
const cleanEmpty = value => (value === '' || value === null ? undefined : value);

module.exports.validateCreateTrade = [
    body('stockName')
        .notEmpty().withMessage('Stock name is required.'),
    body('stockSymbol')
        .notEmpty().withMessage('Stock symbol is required.'),
    body('originalQuantity')
        .isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
    body('entryType')
        .isIn(['buy', 'sell']).withMessage('Entry type must be "buy" or "sell".'),
    body('type')
        .isIn(['long', 'short']).withMessage('Type must be "long" or "short".'),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a valid number >= 0.'),
    body('date')
        .isISO8601().toDate().withMessage('A valid date is required.'),
];

module.exports.validateCloseTrade = [
    body('closePrice')
        .isFloat({ min: 0 }).withMessage('Close price must be a valid number >= 0.'),
    body('closeDate')
        .isISO8601().toDate().withMessage('A valid close date is required.'),
    body('closeQuantity')
        .isInt({ min: 1 }).withMessage('Close quantity must be at least 1.'),
];

module.exports.validateUpdateTrade = [
    body('stockName')
        .customSanitizer(cleanEmpty).optional()
        .isString().withMessage('Stock name must be a string.'),
    body('stockSymbol')
        .customSanitizer(cleanEmpty).optional()
        .isString().withMessage('Stock symbol must be a string.'),
    body('quantity')
        .customSanitizer(cleanEmpty).optional()
        .isNumeric().withMessage('Quantity must be a number.'),
    body('originalQuantity')
        .customSanitizer(cleanEmpty).optional()
        .isInt({ min: 1 }).withMessage('Original quantity must be at least 1.'),
    body('entryType')
        .customSanitizer(cleanEmpty).optional()
        .isIn(['buy', 'sell']).withMessage('Entry type must be "buy" or "sell".'),
    body('type')
        .customSanitizer(cleanEmpty).optional()
        .isIn(['long', 'short']).withMessage('Type must be "long" or "short".'),
    body('buyPrice')
        .customSanitizer(cleanEmpty).optional()
        .isFloat({ min: 0 }).withMessage('Buy price must be >= 0.'),
    body('buyDate')
        .customSanitizer(cleanEmpty).optional()
        .isISO8601().toDate().withMessage('A valid buy date is required.'),
    body('sellPrice')
        .customSanitizer(cleanEmpty).optional()
        .isFloat({ min: 0 }).withMessage('Sell price must be >= 0.'),
    body('sellDate')
        .customSanitizer(cleanEmpty).optional()
        .isISO8601().toDate().withMessage('A valid sell date is required.'),
];
