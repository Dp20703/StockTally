const userModel = require('../models/user.model');
const watchlistModel = require('../models/watchlist.model');

// Add symbol to watchlist
module.exports.addSymbol = async ({ cleanSymbol, stockName, watchlistName, user }) => {
    try {
        // Find watchlist for this user with this name
        let watchlist = await watchlistModel.findOne({
            watchlistName,
            user: user._id,
        });
        console.log("watchlist:", watchlist);
        console.log("user:", user);
        if (!watchlist) {
            console.log("Watchlist not found");
            // Fetch user's total watchlists
            const totalWatchlists = user.watchlists || [];
            console.log("Total watchlists of user:", totalWatchlists.length);

            // Check limit
            if (totalWatchlists.length >= 10) {
                throw new Error("User cannot have more than 10 watchlists.");
            }

            // Create a new watchlist for this user
            watchlist = new watchlistModel({
                watchlistName,
                stocks: [{ stockSymbol: cleanSymbol, stockName }],
                user: user._id,
            });

            await watchlist.save();
        }
        else {
            // Check for duplicate symbol
            const existingStock = watchlist.stocks.find(
                (item) => item.stockSymbol === cleanSymbol
            );

            if (existingStock) {
                throw new Error("Symbol already exists in this watchlist.");
            }

            // Check stock limit
            if (watchlist.stocks.length >= 50) {
                throw new Error("Watchlist cannot have more than 50 stocks.");
            }

            // Add stock
            watchlist.stocks.push({ stockSymbol: cleanSymbol, stockName });
            await watchlist.save();
        }

        // Link watchlist to user if not already linked
        if (!user.watchlists.includes(watchlist._id)) {
            user.watchlists.push(watchlist._id);
            await user.save();
        }

        return watchlist;
    } catch (error) {
        console.error("Error in addSymbol:", error.message);
        throw error;
    }
};
