const watchlistService = require('../services/watchlist.service');
const watchlistModel = require('../models/watchlist.model');
const userModel = require('../models/user.model');

// ── Create Watchlist ─────────────────────────────────────
module.exports.createWatchlist = async (req, res) => {
    const { watchlistName } = req.body;

    try {
        const existing = await watchlistModel.findOne({
            watchlistName: watchlistName.trim(),
            user: req.user._id,
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Watchlist with this name already exists.',
            });
        }

        const watchlist = await watchlistService.createWatchlist({
            watchlistName,
            user: req.user,
        });

        return res.status(201).json({
            success: true,
            message: 'Watchlist created successfully.',
            watchlist,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to create watchlist.',
            details: error.message,
        });
    }
};

// ── Get All Watchlists ───────────────────────────────────
module.exports.getWatchlist = async (req, res) => {
    try {
        const items = await watchlistModel.find({
            _id: { $in: req.user.watchlists },
        });
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch watchlists.',
            details: error.message,
        });
    }
};

// ── Get Watchlist By ID ──────────────────────────────────
module.exports.getWatchlistById = async (req, res) => {
    const { id } = req.params;

    try {
        const watchlist = await watchlistModel.findOne({
            _id: id,
            user: req.user._id,
        }).lean();

        if (!watchlist) {
            return res.status(404).json({
                success: false,
                error: 'Watchlist not found.',
            });
        }

        return res.status(200).json(watchlist);

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch watchlist.',
            details: error.message,
        });
    }
};

// ── Delete Watchlist ─────────────────────────────────────
module.exports.deleteWatchlist = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await watchlistModel.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Watchlist not found.',
            });
        }

        // Remove reference from user document
        await userModel.findByIdAndUpdate(req.user._id, {
            $pull: { watchlists: id },
        });

        return res.status(200).json({
            success: true,
            message: 'Watchlist deleted successfully.',
            deleted: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to delete watchlist.',
            details: error.message,
        });
    }
};

// ── Add Stocks ───────────────────────────────────────────
module.exports.addStocks = async (req, res) => {
    const { stocks, watchlistId } = req.body;

    try {
        const updatedWatchlist = await watchlistService.addStocks({
            watchlistId: watchlistId.trim(),
            stocks,
            user: req.user,
        });

        return res.status(200).json({
            success: true,
            message: 'Stocks added to watchlist successfully.',
            watchlist: updatedWatchlist,
        });

    } catch (error) {
        console.error('Error adding stocks to watchlist:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to add stocks.',
            details: error.message,
        });
    }
};

// ── Delete Stock ─────────────────────────────────────────
module.exports.deleteStock = async (req, res) => {
    const { stockId, watchlistId } = req.params;

    try {
        const result = await watchlistModel.findOneAndUpdate(
            { _id: watchlistId, user: req.user._id },
            { $pull: { stocks: { _id: stockId } } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Stock or watchlist not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Stock removed successfully.',
            watchlist: result,
        });

    } catch (error) {
        console.error('Error removing stock:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to remove stock.',
            details: error.message,
        });
    }
};

// ── Update Watchlist ─────────────────────────────────────
module.exports.updateWatchlist = async (req, res) => {
    const { id } = req.params;
    const { watchlistName, stocks } = req.body;

    try {
        // Check for duplicate watchlist name (excluding current)
        if (watchlistName) {
            const duplicate = await watchlistModel.findOne({
                _id: { $ne: id },
                user: req.user._id,
                watchlistName: watchlistName.trim(),
            });

            if (duplicate) {
                return res.status(409).json({
                    success: false,
                    error: 'Watchlist with this name already exists.',
                });
            }
        }

        // Check for duplicate stock symbols within the request
        if (Array.isArray(stocks)) {
            const symbols = stocks.map((s) => s.stockSymbol?.toUpperCase());
            const unique = new Set(symbols);
            if (symbols.length !== unique.size) {
                return res.status(409).json({
                    success: false,
                    error: 'Stock symbols must be unique.',
                });
            }
        }

        const updated = await watchlistService.updateWatchlist({
            watchlistName,
            stocks,
            id,
        });

        return res.status(200).json({
            success: true,
            message: 'Watchlist updated successfully.',
            updated,
        });

    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to update watchlist.',
            details: error.message,
        });
    }
};
