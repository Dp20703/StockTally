const tradeService = require("../services/trade.service");
const tradeModel = require("../models/trade.model");

module.exports.createTrade = async (req, res) => {
    try {
        const trade = await tradeService.createTrade(req.user._id, req.body);
        res.status(201).json({ success: true, message: 'Trade created successfully', trade });

    } catch (error) {
        // console.log("Error is createTrade controller:", error);
        res.status(500).json({ error: error.message });
    }
}