const watchlistService = require('../services/watchlist.service');
const watchlistModel = require('../models/watchlist.model');
const userModel = require('../models/user.model');

// create watchlist
module.exports.createWatchlist = async (req, res) => {
    const { watchlistName } = req.body;

    if (!watchlistName || typeof watchlistName !== 'string' || watchlistName.trim() === '') {
        return res.status(400).json({ error: 'Watchlist name is required and cannot be empty.' });
    }

    try {
        const existingWatchlist = await watchlistModel.findOne({ watchlistName, user: req.user._id });

        if (existingWatchlist) {
            return res.status(409).json({ message: 'Watchlist with this name already exists.' }); // 409 = Conflict
        }

        const watchlist = await watchlistService.createWatchlist({ watchlistName, user: req.user });

        return res.status(200).json({
            success: true,
            message: 'Watchlist created successfully',
            watchlist
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Failed to create watchlist',
            details: error.message
        });
    }
};

// get watchlist
module.exports.getWatchlist = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    const items = await watchlistModel.find({ _id: { $in: user.watchlists } }).lean();
    res.json(items)
}

//get watchlist by id
module.exports.getWatchlistById = async (req, res) => {
    const { id } = req.params;
    const watchlist = await watchlistModel.findById(id).lean();
    if (!watchlist) {
        return res.status(404).json({ error: 'Watchlist not found' });
    }
    res.json(watchlist);
}

// delete watchlist
module.exports.deleteWatchlist = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await watchlistModel.findByIdAndDelete(id);
        const user = await userModel.findById(req.user._id);
        user.watchlists.pull(id);
        await user.save();

        if (!result) {
            return res.status(404).json({ error: 'Watchlist not found!' });
        }

        res.json({ message: 'Watchlist deleted', deleted: result });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// add symbol to watchlist
module.exports.addSymbol = async (req, res) => {
    const { stockSymbol, stockName, watchlistName } = req.body;

    if (!stockSymbol || typeof stockSymbol !== 'string' || stockSymbol.trim() === '') {
        return res.status(400).json({ error: 'Sybmol is required and cannot be empty.' })
    }
    if (!watchlistName || typeof watchlistName !== 'string' || watchlistName.trim() === '') {
        return res.status(400).json({ error: 'Watchlist name is required and cannot be empty.' })
    }
    try {
        const cleanSymbol = stockSymbol.trim().toUpperCase();

        const watchlist = await watchlistService.addSymbol({ cleanSymbol, stockName, watchlistName, user: req.user });

        res.json({ success: true, message: 'Symbol added to watchlist successfully', watchlist })
    }
    catch (error) {
        console.log("Error is add to watchlist:", error);
        res.status(500).json({ error: 'Failed to save symbol', details: error.message })
    }
}


// delete stock
module.exports.deleteStock = async (req, res) => {
    const { stockId, watchlistId } = req.params;

    if (!stockId || !watchlistId) {
        return res.status(400).json({ error: 'StockId and WatchlistId are required' });
    }
    try {
        const result = await watchlistModel.findByIdAndUpdate(watchlistId, {
            $pull: { stocks: { _id: stockId } }
        },
            {
                new: true
            });
        if (!result) {
            return res.status(404).json({ error: 'Stock not found in watchlist' });
        }

        res.json({ success: true, message: 'Stock removed successfully.', watchlist: result });

    } catch (error) {
        console.error("Error removing stock:", error);
        res.status(500).json({ error: 'Failed to remove stock', details: error.message });
    }
}

// udpate watchlist 
module.exports.udpateWatchlist = async (req, res) => {
    const { id } = req.params;
    const { watchlistName, stocks } = req.body;

    try {

        const updatedWatchlist = await watchlistService.updateWatchlist({ watchlistName, stocks, id });

        res.json({ message: "Watchlist updated", updated: updatedWatchlist });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({
            error: "Failed to update watchlist",
            details: error.message
        });
    }
};


