const tradeModel = require('../models/trade.model');

// Create a new trade
module.exports.createTrade = async (userId, tradeData) => {
    try {
        const { stockName, stockSymbol, buyPrice, buyDate, sellPrice, sellDate, originalQuantity, entryType, type } = tradeData;

        // Prepare the data to save
        let tradeDataToSave = {
            user: userId,
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
