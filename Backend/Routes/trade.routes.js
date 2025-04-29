const express = require("express");
const router = express.Router();
const authMiddelware = require("../middlewares/auth.middleware");
const {validateRequest} = require('../middlewares/validateRequest');
const tradeController = require('../controllers/trade.controller');
const { body } = require('express-validator')

router.post('/create', authMiddelware.authUser, [
    body('stockName').notEmpty().withMessage('Stock name is required.'),
    body('stockSymbol').notEmpty().withMessage('Stock symbol is required.'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
    body('buyPrice').isFloat({ min: 0 }).withMessage('Buy price must be greater than zero.'),
    body('buyDate').isISO8601().toDate().withMessage('Valid buy date is required.')
], validateRequest, tradeController.createTrade)


module.exports = router;