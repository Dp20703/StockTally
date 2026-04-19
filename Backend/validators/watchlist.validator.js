const { body, param } = require('express-validator');

// ── Create Watchlist ─────────────────────────────────────
exports.createWatchlist = [
  body('watchlistName')
    .notEmpty().withMessage('Watchlist name is required.')
    .isString().withMessage('Watchlist name must be a string.')
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Watchlist name must be between 1 and 50 characters.'),
];

// ── Add Stocks ───────────────────────────────────────────
exports.addStocks = [
  body('watchlistId')
    .notEmpty().withMessage('Watchlist ID is required.')
    .isString().withMessage('Watchlist ID must be a string.')
    .isMongoId().withMessage('Watchlist ID must be a valid MongoDB ID.'),

  body('stocks')
    .isArray({ min: 1 }).withMessage('Stocks must be a non-empty array.')
    .custom((stocks) => {
      if (stocks.length > 10) {
        throw new Error('You can add a maximum of 10 stocks at a time.');
      }
      return true;
    }),

  body('stocks.*.stockName')
    .notEmpty().withMessage('Stock name is required for each stock.')
    .isString().withMessage('Stock name must be a string.')
    .trim(),

  body('stocks.*.stockSymbol')
    .notEmpty().withMessage('Stock symbol is required for each stock.')
    .isString().withMessage('Stock symbol must be a string.')
    .trim()
    .isLength({ min: 1, max: 20 }).withMessage('Stock symbol must be between 1 and 20 characters.'),
];

// ── Update Watchlist ─────────────────────────────────────
exports.updateWatchlist = [
  param('id')
    .isMongoId().withMessage('Watchlist ID must be a valid MongoDB ID.'),

  body('watchlistName')
    .optional()
    .isString().withMessage('Watchlist name must be a string.')
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Watchlist name must be between 1 and 50 characters.'),

  body('stocks')
    .optional()
    .isArray().withMessage('Stocks must be an array.'),

  body('stocks.*.stockName')
    .optional()
    .isString().withMessage('Stock name must be a string.')
    .trim(),

  body('stocks.*.stockSymbol')
    .optional()
    .isString().withMessage('Stock symbol must be a string.')
    .trim(),
];

// ── Delete Watchlist ─────────────────────────────────────
exports.deleteWatchlist = [
  param('id')
    .isMongoId().withMessage('Watchlist ID must be a valid MongoDB ID.'),
];

// ── Delete Stock ─────────────────────────────────────────
exports.deleteStock = [
  param('watchlistId')
    .isMongoId().withMessage('Watchlist ID must be a valid MongoDB ID.'),

  param('stockId')
    .isMongoId().withMessage('Stock ID must be a valid MongoDB ID.'),
];
