const watchlistModel = require('../models/watchlist.model');

const MAX_STOCKS = 10;

// ── Create Watchlist ─────────────────────────────────────
module.exports.createWatchlist = async ({ watchlistName, user }) => {
    const watchlist = new watchlistModel({
        watchlistName: watchlistName.trim(),
        user: user._id,
    });

    await watchlist.save();

    // Link watchlist to user if not already linked
    if (!user.watchlists.includes(watchlist._id)) {
        user.watchlists.push(watchlist._id);
        await user.save();
    }

    return watchlist;
};

// ── Add Stocks ───────────────────────────────────────────
module.exports.addStocks = async ({ watchlistId, stocks, user }) => {
    const watchlist = await watchlistModel.findOne({
        _id: watchlistId,
        user: user._id,
    });

    if (!watchlist) {
        throw new Error('Watchlist not found.');
    }

    // Sanitize and normalize incoming stocks
    const cleanedStocks = stocks.map((stock) => ({
        stockName: stock.stockName.trim(),
        stockSymbol: stock.stockSymbol.trim().toUpperCase(),
    }));

    // Check for duplicate symbols within the request itself
    const incomingSymbols = cleanedStocks.map((s) => s.stockSymbol);
    const uniqueIncoming = new Set(incomingSymbols);
    if (incomingSymbols.length !== uniqueIncoming.size) {
        throw new Error('Duplicate stock symbols in request.');
    }

    // Check available slots
    const availableSlots = MAX_STOCKS - watchlist.stocks.length;
    if (availableSlots <= 0) {
        throw new Error('Watchlist already contains the maximum of 10 stocks.');
    }

    // Filter out stocks already in the watchlist
    const existingSymbols = new Set(watchlist.stocks.map((s) => s.stockSymbol));
    const newStocks = cleanedStocks.filter((s) => !existingSymbols.has(s.stockSymbol));

    if (newStocks.length === 0) {
        throw new Error('All provided stock symbols already exist in the watchlist.');
    }

    if (newStocks.length > availableSlots) {
        throw new Error(`You can only add ${availableSlots} more stock(s).`);
    }

    watchlist.stocks.push(...newStocks);

    return await watchlist.save();
};

// ── Update Watchlist ─────────────────────────────────────
module.exports.updateWatchlist = async ({ watchlistName, stocks, id }) => {
    if (watchlistName) {
        await watchlistModel.findByIdAndUpdate(
            id,
            { $set: { watchlistName: watchlistName.trim() } },
            { new: true }
        );
    }

    // Update each stock individually by its _id
    if (Array.isArray(stocks)) {
        for (const stock of stocks) {
            const { stockId, stockName, stockSymbol } = stock;

            if (stockId && (stockName || stockSymbol)) {
                const stockUpdate = {};
                if (stockName) stockUpdate['stocks.$.stockName'] = stockName.trim();
                if (stockSymbol) stockUpdate['stocks.$.stockSymbol'] = stockSymbol.trim().toUpperCase();

                await watchlistModel.findOneAndUpdate(
                    { _id: id, 'stocks._id': stockId },
                    { $set: stockUpdate },
                    { new: true }
                );
            }
        }
    }

    return await watchlistModel.findById(id);
};
