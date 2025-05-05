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
        const trade = await tradeModel.findById(tradeId);
        if (!trade) {
            throw { message: 'Trade not found', code: 404 };  // Throwing error with status code
        }

        if (trade.status === 'closed') {
            throw { message: 'Trade already closed', code: 406 };
        }

        if (closeQuantity > trade.quantity) {
            throw { message: 'Close quantity is greater than trade quantity', code: 405 };
        }

        if (trade.entryType === 'buy') {
            if (trade.buyPrice === null) {
                throw { message: 'Buy price not set', code: 400 };
            }

            if (['long', 'short'].includes(trade.type)) {
                trade.sellPrice = closePrice;
                trade.sellDate = closeDate;
            } else {
                throw { message: 'Invalid trade type. Must be "long" or "short".', code: 400 };
            }

        }
        else if (trade.entryType === 'sell') {
            if (trade.sellPrice === null) {
                throw { message: 'Sell price not set', code: 400 };
            }

            if (['long', 'short'].includes(trade.type)) {
                trade.buyPrice = closePrice;
                trade.buyDate = closeDate;
            } else {
                throw { message: 'Invalid trade type. Must be "long" or "short".', code: 400 };
            }

        } else {
            throw { message: 'Invalid entry type. Must be "buy" or "sell".', code: 400 };
        }

        if (closeQuantity < trade.quantity) {
            trade.quantity -= closeQuantity;
            trade.status = 'open';
        } else {
            trade.quantity = 0;
            trade.status = 'closed';
        }

        trade.calculateProfit(closeQuantity);
        await trade.save();

        await userModel.findByIdAndUpdate(trade.user, {
            $pull: { trades: trade._id },
            $inc: { totalProfit: trade.finalProfit }
        });

        console.log("Closed trade Details:", trade);
        return trade;

    } catch (err) {
        // Make sure to respond with a proper status code
        console.log("Error in closeTrade service:", err);
        return { success: false, message: err.message || 'Server error', code: err.code || 500 };
    }
};



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
