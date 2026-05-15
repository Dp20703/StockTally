const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const watchlistController = require('../controllers/watchlist.controller');
const watchlistValidator = require('../validators/watchlist.validator');
const { validateRequest } = require('../middlewares/validateRequest');

// ── Create Watchlist ── POST /watchlist/create
router.post('/create',authMiddleware.authUser,watchlistValidator.createWatchlist,validateRequest,watchlistController.createWatchlist
);

// ── Get All Watchlists ── GET /watchlist/get
router.get('/get',authMiddleware.authUser,watchlistController.getWatchlist);

// ── Get Watchlist By ID ── GET /watchlist/get/:id
router.get('/get/:id',authMiddleware.authUser,watchlistController.getWatchlistById);

// ── Delete Watchlist ── DELETE /watchlist/delete/:id
router.delete('/delete/:id',authMiddleware.authUser,watchlistValidator.deleteWatchlist,validateRequest,watchlistController.deleteWatchlist);

// ── Add Stocks ── POST /watchlist/add
router.post('/add',authMiddleware.authUser,watchlistValidator.addStocks,validateRequest,watchlistController.addStocks);

// ── Delete Stock ── DELETE /watchlist/:watchlistId/delete/stock/:stockId
router.delete('/:watchlistId/delete/stock/:stockId',authMiddleware.authUser,watchlistValidator.deleteStock,validateRequest,watchlistController.deleteStock);

// ── Update Watchlist ── PUT /watchlist/update/:id
router.put('/update/:id',authMiddleware.authUser,watchlistValidator.updateWatchlist,validateRequest,watchlistController.updateWatchlist);

module.exports = router;
