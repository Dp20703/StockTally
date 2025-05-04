const tradeModel = require('../models/trade.model');

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
