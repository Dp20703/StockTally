const tradeModel = require('../models/trade.model');

// Create a new trade
module.exports.createTrade = async (userId, tradeData) => {
    try {
        const { stockName, stockSymbol, buyPrice, buyDate, sellPrice, sellDate, quantity, entryType, type } = tradeData;

        // Prepare the data to save
        let tradeDataToSave = {
            user: userId,
            stockName,
            stockSymbol,
            quantity,
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

