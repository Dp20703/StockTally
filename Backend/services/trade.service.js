const tradeModel = require('../models/trade.model');
const userModel = require('../models/user.model');
const axios = require('axios')

// Create a new trade
module.exports.createTrade = async (user, tradeData) => {
    try {
        const { stockName, stockSymbol, buyPrice, buyDate, sellPrice, sellDate, originalQuantity, entryType, type } = tradeData;

        // Prepare the data to save
        let tradeDataToSave = {
            user: user._id,
            stockName,
            stockSymbol,
            quantity: originalQuantity,
            originalQuantity,
            type, // 'long' or 'short'
            entryType, // 'buy' or 'sell'
            status: 'open', // Mark trade as open initially
        };

        // Set prices and dates based on entry type
        if (entryType === 'buy') {
            tradeDataToSave.buyPrice = buyPrice;
            tradeDataToSave.buyDate = buyDate;
        } else if (entryType === 'sell') {
            tradeDataToSave.sellPrice = sellPrice;
            tradeDataToSave.sellDate = sellDate;
        }

        // Create and save the new trade
        const newTrade = await tradeModel.create(tradeDataToSave);
        user.trades.push(newTrade._id);
        await user.save();
        return newTrade;

    } catch (error) {
        console.log("Error in createTrade service:", error);
        throw error;
    }
};

// close a trade
module.exports.closeTrade = async (tradeId, closePrice, closeDate, closeQuantity) => {
    try {
        const closedTrade = await tradeModel.closeTrade(tradeId, closePrice, closeDate, closeQuantity)

        await userModel.findByIdAndUpdate(closedTrade.user, {
            $pull: { trades: closedTrade._id },
            $inc: { totalProfit: closedTrade.finalProfit } // ✅ Add profit to totalProfit
        });


        return closedTrade;
    } catch (error) {
        console.log("Error in closeTrade service:", error);
        throw new Error(error.message);
    }
}

// update a trade
module.exports.updateTrade = async (tradeId, tradeData) => {
    try {
        const trade = await tradeModel.findById(tradeId);
        if (!trade) {
            throw new Error('Trade not found');
        }
        const { profit, finalProfit, ...restOfTradeData } = tradeData;
        Object.keys(restOfTradeData).forEach(key => {
            if (trade[key] !== undefined) {
                trade[key] = restOfTradeData[key];
            }
        });
        // Recalculate profit after the update
        trade.calculateProfit();
        // Save the updated trade
        await trade.save();
        return trade;

    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Error updating trade');
    }
}

// get stock price
module.exports.getStockPrice = async (symbol) => {
    const headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": `https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`,
    };

    const url = `https://www.nseindia.com/api/quote-equity?symbol=${symbol.toUpperCase()}`;
    // console.log("Request URL:", url);

    try {
        const session = axios.create({ headers, withCredentials: true }); // Ensure cookies are handled

        // First request to initiate session and set cookies
        await session.get("https://www.nseindia.com");

        // Second request to fetch the stock price
        const response = await session.get(url);
        console.log("Full Response Data:", response.data);

        // Check if we got a valid response and price info
        if (response.status === 200 && response.data.priceInfo && response.data.priceInfo.lastPrice) {
            const price = response.data.priceInfo.lastPrice;
            console.log(`${symbol} current price is:`, price);
            return price;
        } else {
            throw new Error(`Failed to fetch price. Response doesn't contain valid data.`);
        }
    } catch (err) {
        console.error("Error fetching stock price:", err.message);
        throw err; // Rethrow the error to be caught by higher-level handlers
    }
};
