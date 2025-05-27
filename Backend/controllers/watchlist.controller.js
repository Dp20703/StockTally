const watchlistService = require('../services/watchlist.service');
const watchlistModel = require('../models/watchlist.model');
const userModel = require('../models/user.model');

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

// get watchlist
module.exports.getWatchlist = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    const items = await watchlistModel.find({ _id: { $in: user.watchlists } }).lean();
    res.json(items)
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
    const { watchlistName, stockName, stockSymbol, newStockSymbol } = req.body;
    console.log("new symbol:", newStockSymbol)
    let update = {};
    if (watchlistName) update.watchlistName = watchlistName;
    if (stockName) update["stocks.$.stockName"] = stockName;
    if (newStockSymbol) update["stocks.$.stockSymbol"] = newStockSymbol.trim().toUpperCase();

    try {
        let result;

        if (watchlistName && !stockName && !newStockSymbol && !stockSymbol) {
            result = await watchlistModel.findOneAndUpdate({ _id: id },
                { $set: update }, { new: true });
        }
        else {
            result = await watchlistModel.findOneAndUpdate({ _id: id, 'stocks.stockSymbol': stockSymbol },
                { $set: update }, { new: true })
        }
        if (!result) {
            res.status(404).json({ message: 'watchlist or stock not found' })
        }

        res.json({ message: 'watchlist updated', udpated: result })

    } catch (error) {
        res.status(500).json({ erorr: "Failed to update watchlist ", details: error.message })
    }

}