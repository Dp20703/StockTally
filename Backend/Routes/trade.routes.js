const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRequest } = require('../middlewares/validateRequest');
const tradeController = require('../controllers/trade.controller');
const { body } = require('express-validator')

// trades/create
router.post('/create', authMiddleware.authUser, [
    body('stockName').notEmpty().withMessage('Stock name is required.'),
    body('stockSymbol').notEmpty().withMessage('Stock symbol is required.'),
    body('originalQuantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
    body('entryType').isIn(['buy', 'sell']).withMessage('Entry type must be either "buy" or "sell".'),
    body('type').isIn(['long', 'short']).withMessage('Type must be either "long" or "short".'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be valid and greater than zero.'),
    body('date').isISO8601().toDate().withMessage('Valid date is required.')
], validateRequest, tradeController.createTrade);

// trades/get_all_trades
router.get('/get_all_trades', authMiddleware.authUser, tradeController.getAllTrades)

// trades/get_trade
router.get('/get_trade/:tradeId', authMiddleware.authUser, tradeController.getTrade)

// trades/close/:tradeId
router.post('/close/:tradeId', authMiddleware.authUser, [
    body('closePrice').isFloat({ min: 0 }).withMessage('Price must be a valid number.'),
    body('closeDate').isISO8601().toDate().withMessage('Valid date is required.'),
    body('closeQuantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.')
], validateRequest, tradeController.closeTrade);


// trades/update/:tradeId
router.put('/update/:tradeId', authMiddleware.authUser, 
 [
  body('symbolName')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isString().withMessage('Stock name must be a string.'),

  body('symbolSymbol')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isString().withMessage('Stock symbol must be a string.'),

  body('quantity')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isNumeric().withMessage('Quantity must be a number.'),

  body('originalQuantity')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isInt({ min: 1 }).withMessage('Original quantity must be at least 1.'),

  body('entryType')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isIn(['buy', 'sell']).withMessage('Entry type must be either "buy" or "sell".'),

  body('type')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isIn(['long', 'short']).withMessage('Type must be either "long" or "short".'),

  body('buyPrice')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isFloat({ min: 0 }).withMessage('Buy price must be a valid number greater than or equal to 0.'),

  body('buyDate')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isISO8601().toDate().withMessage('Valid buy date is required.'),

  body('sellPrice')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isFloat({ min: 0 }).withMessage('Sell price must be a valid number greater than or equal to 0.'),

  body('sellDate')
    .customSanitizer(value => (value === '' || value === null ? undefined : value))
    .optional()
    .isISO8601().toDate().withMessage('Valid sell date is required.')
]
, validateRequest, tradeController.updateTrade);


// trades/delete/:tradeId
router.delete('/delete/:tradeId', authMiddleware.authUser, tradeController.deleteTrade);
module.exports = router;


// trades/price/:stockSymbol
router.get('/price/:stockSymbol', authMiddleware.authUser, tradeController.getStockPrice);