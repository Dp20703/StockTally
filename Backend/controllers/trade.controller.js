const tradeService = require("../services/trade.service");
const tradeModel = require("../models/trade.model");

// this controller function will create a trade:
module.exports.createTrade = async (req, res) => {
    try {
        const trade = await tradeService.createTrade(req.user._id, req.body);
        res.status(201).json({ success: true, message: 'Trade created successfully', trade });

    } catch (error) {
        console.log("Error is createTrade controller:", error);
        res.status(500).json({ error: error.message });
    }
}

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
