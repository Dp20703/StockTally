const userModel = require('../models/user.model');
const watchlistModel = require('../models/watchlist.model');

// Add symbol to watchlist
module.exports.addSymbol = async ({ cleanSymbol, stockName, watchlistName, user }) => {
    // Check if watchlist with that name exists
    let watchlist = await watchlistModel.findOne({ watchlistName });

    if (!watchlist) {
        // Create new watchlist
        watchlist = new watchlistModel({
            watchlistName,
            stocks: [{ stockSymbol: cleanSymbol, stockName: stockName }],
            user: user
        })
        await watchlist.save();
    }
    else {
        // Check if watchlist has more than 50 stocks
        if (watchlist.stocks.length >= 50) {
            throw new Error('Watchlist cannot have more than 50 stocks.');
        }

        // Check if symbol already exists in watchlist
        const existingStock = watchlist.stocks.find(item => item.stockSymbol.trim().toUpperCase() === cleanSymbol);
        console.log("existingStock: ", existingStock)
        if (existingStock) {
            throw new Error('Symbol already exists in this watchlist.');
        }

        // Add symbol to watchlist
        watchlist.stocks.push({ stockSymbol: cleanSymbol, stockName });

        // Add user to watchlist if not already added
        if (!watchlist.user.includes(user._id)) {
            watchlist.user.push(user._id);
        }
        await watchlist.save();
    }

    // Add watchlist reference to user if not already present
    if (!user.watchlists.includes(watchlist._id)) {
        user.watchlists.push(watchlist._id);
        await user.save();
    }
    return watchlist
}