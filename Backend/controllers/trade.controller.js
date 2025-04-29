const tradeService = require("../services/trade.service");
const tradeModel = require("../models/trade.model");

// this controller function will create a trade:
module.exports.createTrade = async (req, res) => {
    try {
        const { stockName, stockSymbol, quantity, type, entryType, price, date } = req.body;

        // Create the trade data object
        const tradeData = { stockName, stockSymbol, quantity, type, entryType };

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
        const trade = await tradeService.createTrade(req.user._id, tradeData);

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
