const watchlistService = require('../services/watchlist.service');

function handleError(res, err, fallback) {
    if (err.status) return res.status(err.status).json({ success: false, message: err.message });
    console.error(fallback, err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
}

// ── Create Watchlist ──────────────────────────────────────────────────────────

module.exports.createWatchlist = async (req, res) => {
    try {
        const watchlist = await watchlistService.createWatchlist({
            watchlistName: req.body.watchlistName,
            user: req.user,
        });
        return res.status(201).json({ success: true, message: 'Watchlist created successfully.', watchlist });
    } catch (err) {
        // ✅ Mongo duplicate key error (compound index) → 409
        if (err.code === 11000) {
            return res.status(409).json({ success: false, message: 'Watchlist with this name already exists.' });
        }
        return handleError(res, err, 'createWatchlist error:');
    }
};

// ── Get All Watchlists ────────────────────────────────────────────────────────

module.exports.getWatchlist = async (req, res) => {
    try {
        const watchlists = await watchlistService.getWatchlist(req.user._id);
        return res.status(200).json({ success: true, watchlists });
    } catch (err) {
        return handleError(res, err, 'getWatchlist error:');
    }
};

// ── Get Watchlist By ID ───────────────────────────────────────────────────────

module.exports.getWatchlistById = async (req, res) => {
    try {
        const watchlist = await watchlistService.getWatchlistById(req.params.id, req.user._id);
        return res.status(200).json({ success: true, watchlist });
    } catch (err) {
        return handleError(res, err, 'getWatchlistById error:');
    }
};

// ── Add Stocks ────────────────────────────────────────────────────────────────

module.exports.addStocks = async (req, res) => {
    try {
        const watchlist = await watchlistService.addStocks({
            watchlistId: req.body.watchlistId.trim(),
            stocks:      req.body.stocks,
            userId:      req.user._id,             // ✅ pass userId not full user object
        });
        return res.status(200).json({ success: true, message: 'Stocks added successfully.', watchlist });
    } catch (err) {
        return handleError(res, err, 'addStocks error:');
    }
};

// ── Delete Stock ──────────────────────────────────────────────────────────────

module.exports.deleteStock = async (req, res) => {
    try {
        const watchlist = await watchlistService.deleteStock({
            watchlistId: req.params.watchlistId,
            stockId:     req.params.stockId,
            userId:      req.user._id,
        });
        return res.status(200).json({ success: true, message: 'Stock removed successfully.', watchlist });
    } catch (err) {
        return handleError(res, err, 'deleteStock error:');
    }
};

// ── Update Watchlist ──────────────────────────────────────────────────────────

module.exports.updateWatchlist = async (req, res) => {
    try {
        const updated = await watchlistService.updateWatchlist({
            id:            req.params.id,
            watchlistName: req.body.watchlistName,
            stocks:        req.body.stocks,
        });
        return res.status(200).json({ success: true, message: 'Watchlist updated successfully.', updated });
    } catch (err) {
        // Duplicate name on update
        if (err.code === 11000) {
            return res.status(409).json({ success: false, message: 'Watchlist with this name already exists.' });
        }
        return handleError(res, err, 'updateWatchlist error:');
    }
};

// ── Delete Watchlist ──────────────────────────────────────────────────────────

module.exports.deleteWatchlist = async (req, res) => {
    try {
        await watchlistService.deleteWatchlist({
            watchlistId: req.params.id,
            userId:      req.user._id,
        });
        return res.status(200).json({ success: true, message: 'Watchlist deleted successfully.' });
    } catch (err) {
        return handleError(res, err, 'deleteWatchlist error:');
    }
};