const tradeService = require("../services/trade.service");
const tradeModel = require("../models/trade.model");

// this controller function will create a trade:
module.exports.createTrade = async (req, res) => {
    try {
        const { stockName, stockSymbol, originalQuantity, type, entryType, price, date } = req.body;

        // Create the trade data object
        const tradeData = { stockName, stockSymbol, originalQuantity, type, entryType };

        // Validate entryType and type in the controller
        if (!['buy', 'sell'].includes(entryType)) {
            return res.status(400).json({ error: 'Invalid entry type. Must be "buy" or "sell".' });
        }

        if (!['long', 'short'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type. Must be "long" or "short".' });
        }

        // Based on entryType, set either buy or sell price and date
        if (entryType === 'buy') {
            tradeData.buyPrice = price;
            tradeData.buyDate = date;
        } else if (entryType === 'sell') {
            tradeData.sellPrice = price;
            tradeData.sellDate = date;
        }

        // Call service to create the trade
        const trade = await tradeService.createTrade(req.user, tradeData);

        // Return success response
        res.status(201).json({ success: true, message: 'Trade created successfully', trade });

    } catch (error) {
        console.log("Error in createTrade controller:", error);
        res.status(500).json({ error: error.message });
    }
};

// this controller function will fetch all trades of a user:
module.exports.getAllTrades = async (req, res) => {
    try {
        const trades = await tradeModel.find({ user: req.user._id }); // No populate

        res.status(200).json({
            success: true,
            message: 'Fetched trades for the logged-in user',
            user: req.user,
            trades
        });
    } catch (error) {
        console.log("Error is getAllTrades controller:", error);
        res.status(500).json({ error: error.message });
    }
}

// this controller function will fetch the trade of a user using tradeid:
module.exports.getTrade = async (req, res) => {
    try {
        const { tradeId } = req.params;
        const trade = await tradeModel.find({ _id: tradeId });
        console.log("Get Trade Controller :", trade);
        res.status(200).json({
            success: true,
            message: 'Fetched trade for the logged-in user',
            user: req.user,
            trade
        });
    } catch (error) {
        console.log("Error is get_trade controller:", error);
        res.status(500).json({ error: error.message });
    }
}

// this controller function will close a trade:
module.exports.closeTrade = async (req, res) => {
    try {
        const { closePrice, closeDate, closeQuantity } = req.body;
        const { tradeId } = req.params;

        const closeTrade = await tradeService.closeTrade(tradeId, closePrice, closeDate, closeQuantity);

        if (!closeTrade.success) {
            return res.status(closeTrade.code || 400).json({ message: closeTrade.message });
        }
        res.status(200).json({
            message: "Trade closed successfully",
            trade: closeTrade
        })

    } catch (error) {
        console.log("Error in closeTrade controller:", error);
        res.status(500).json({ error: error.message });

    }
}

// this controller function will udpate a trade:
module.exports.updateTrade = async (req, res) => {
    try {
        const { tradeId } = req.params;
        const tradeData = req.body;
        const updatedTrade = await tradeService.updateTrade(tradeId, tradeData);
        return res.status(200).json({
            success: true,
            message: 'Trade updated successfully',
            data: updatedTrade,
        });

    }
    catch (error) {
        console.log("Error in updateTrade controller:", error);
        res.status(500).json({ error: error.message });
    }
}

// this controller function will delete a trade:
module.exports.deleteTrade = async (req, res) => {
    const { tradeId } = req.params;

    try {
        // Use tradeId in the condition to delete the trade
        const deletedTrade = await tradeModel.deleteOne({ _id: tradeId });

        if (!deletedTrade.deletedCount) {
            return res.status(404).json({ message: "Trade not found" });
        }

        res.status(200).json({ message: "Trade deleted successfully", deletedTrade: deletedTrade });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Error deleting trade' });
    }
}

// this controller function will fetch realtime price of a stock:
module.exports.getStockPrice = async (req, res) => {
    try {
        const { stockSymbol } = req.params;
        const stockPrice = await tradeService.getStockPrice(stockSymbol);
        res.status(200).json({
            success: true,
            message: 'Fetched stock price',
            'Stock Price': stockPrice
        });
    } catch (error) {
        console.log("Error in getStockPrice controller:", error);
        res.status(500).json({ error: error.message });
    }
}