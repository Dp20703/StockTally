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

// trades/close/:tradeId
router.post('/close/:tradeId', authMiddleware.authUser, [
    body('closePrice').isFloat({ min: 0 }).withMessage('Price must be a valid number.'),
    body('closeDate').isISO8601().toDate().withMessage('Valid date is required.'),
    body('closeQuantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.')
], validateRequest, tradeController.closeTrade);


// trades/update/:tradeId
router.put('/update/:tradeId', authMiddleware.authUser, [
    body('symbolName').optional().notEmpty().withMessage('Stock name is required.'),
    body('symbolSymbol').optional().notEmpty().withMessage('Stock symbol is required.'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
    body('originalQuantity').optional().isInt({ min: 1 }).withMessage('originalQuantity must be at least 1.'),
    body('entryType').optional().isIn(['buy', 'sell']).withMessage('Entry type must be either "buy" or "sell".'),
    body('type').optional().isIn(['long', 'short']).withMessage('Type must be either "long" or "short".'),
    body('buyPrice').optional().isFloat({ min: 0 }).withMessage('Buy Price must be valid and greater than zero.'),
    body('buyDate').optional().isISO8601().toDate().withMessage('Valid Buy date is required.'),
    body('sellPrice').optional().isFloat({ min: 0 }).withMessage('Sell Price must be valid and greater than zero.'),
    body('sellDate').optional().isISO8601().toDate().withMessage('Valid Sell date is required.')
], validateRequest, tradeController.updateTrade);


// trades/delete/:tradeId
router.delete('/delete/:tradeId', authMiddleware.authUser, tradeController.deleteTrade);
module.exports = router;