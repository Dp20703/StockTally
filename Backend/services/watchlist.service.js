const watchlistModel = require('../models/watchlist.model');

// Create watchlist
module.exports.createWatchlist = async ({ watchlistName, user }) => {

    const watchlist = new watchlistModel({ watchlistName, user: user._id });
    await watchlist.save();

    // Link watchlist to user if not already linked
    if (!user.watchlists.includes(watchlist._id)) {
        user.watchlists.push(watchlist._id);
        await user.save();
    }

    return watchlist;
}

// Add stocks to watchlist
module.exports.addStocks = async ({ watchlistId, stocks, user }) => {

    const watchlist = await watchlistModel.findOne({
        _id: watchlistId,
        user: user._id,
    });

    console.log("watchlist:", watchlist);
    console.log("user:", user);
    if (!watchlist) {
        throw new Error('watchlist not found.')
    }

    // Sanitize and normalize stock data
    const cleanedStocks = stocks.map(stock => ({
        stockName: stock.stockName?.trim(),
        stockSymbol: stock.stockSymbol?.trim().toUpperCase(),
    }));

    // Push new stocks into the existing array
    watchlist.stocks.push(...cleanedStocks);

    // Save updated watchlist
    await watchlist.save();
    return watchlist;
};

// update watchlist
module.exports.updateWatchlist = async ({ watchlistName, stocks, id }) => {
    // Update watchlist name if provided
    if (watchlistName) {
        await watchlistModel.findByIdAndUpdate(
            id,
            { $set: { watchlistName } },
            { new: true }
        );
    }

    // Update each stock individually by stockId
    if (Array.isArray(stocks)) {
        for (const stock of stocks) {
            const { stockId, stockName, stockSymbol } = stock;

            if (stockId && (stockName || stockSymbol)) {
                const stockUpdate = {};
                if (stockName) stockUpdate["stocks.$.stockName"] = stockName;
                if (stockSymbol) stockUpdate["stocks.$.stockSymbol"] = stockSymbol.trim().toUpperCase();

                await watchlistModel.findOneAndUpdate(
                    { _id: id, "stocks._id": stockId },
                    { $set: stockUpdate },
                    { new: true }
                );
            }
        }
    }

    const updatedWatchlist = await watchlistModel.findById(id);
    return updatedWatchlist;
}