const express = require("express");
const router = express.Router();
const authMiddelware = require("../middlewares/auth.middleware");
const { validateRequest } = require('../middlewares/validateRequest');
const tradeController = require('../controllers/trade.controller');
const { body } = require('express-validator')

// trades/create
router.post('/create', authMiddelware.authUser, [
    body('stockName').notEmpty().withMessage('Stock name is required.'),
    body('stockSymbol').notEmpty().withMessage('Stock symbol is required.'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
    body('entryType').isIn(['buy', 'sell']).withMessage('Entry type must be either "buy" or "sell".'),
    body('type').isIn(['long', 'short']).withMessage('Type must be either "long" or "short".'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be valid and greater than zero.'),
    body('date').isISO8601().toDate().withMessage('Valid date is required.')
], validateRequest, tradeController.createTrade);


// trades/get_all_trades
router.get('/get_all_trades', authMiddelware.authUser, tradeController.getAllTrades)

module.exports = router;