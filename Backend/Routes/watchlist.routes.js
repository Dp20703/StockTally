const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const watchlistController = require('../controllers/watchlist.controller');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validateRequest');

//create wablist [ /watchlist/create ]
router.post('/create', authMiddleware.authUser, watchlistController.createWatchlist);

// Get watchlist => [ /watchlist/get ]
router.get("/get", authMiddleware.authUser, watchlistController.getWatchlist)

// Get watchlist by id => [ /watchlist/get/:id ]
router.get("/get/:id", authMiddleware.authUser, watchlistController.getWatchlistById)

// Delete Watchlist => [ /watchlist/delete/:id ]
router.delete('/delete/:id', authMiddleware.authUser, watchlistController.deleteWatchlist);

// AddSymbol to watchlist => [ /watchlist/add ]
router.post('/add', authMiddleware.authUser, [
    body('stockName').notEmpty().withMessage('Stock name is required.'),
    body('stockSymbol').notEmpty().withMessage('Stock symbol is required.'),
], validateRequest, watchlistController.addSymbol);

// Delete Stock => [ /watchlist/:watchlistId/delete/stock/:stockId ]
router.delete('/:watchlistId/delete/stock/:stockId', authMiddleware.authUser, watchlistController.deleteStock);

// Update watchlist => [ /watchlist/update/:id ]
router.put('/update/:id', authMiddleware.authUser, watchlistController.udpateWatchlist);


module.exports = router;




