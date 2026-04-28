const tradeModel = require('../models/trade.model');
const userModel = require('../models/user.model');
const axios = require('axios');
const { wrapper } = require("axios-cookiejar-support");
const tough = require("tough-cookie");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

// ─── createTrade ──────────────────────────────────────────────────────────────

module.exports.createTrade = async (user, tradeData) => {
    const {
        stockName, stockSymbol,
        buyPrice, buyDate,
        sellPrice, sellDate,
        originalQuantity, entryType, type,
    } = tradeData;

    const dataToSave = {
        user: user._id,
        stockName,
        stockSymbol,
        quantity: originalQuantity,
        originalQuantity,
        type,
        entryType,
        status: 'open',
    };

    if (entryType === 'buy') {
        dataToSave.buyPrice = buyPrice;
        dataToSave.buyDate = buyDate;
    } else {
        dataToSave.sellPrice = sellPrice;
        dataToSave.sellDate = sellDate;
    }

    const newTrade = await tradeModel.create(dataToSave);

    user.trades.push(newTrade._id);
    await user.save();

    return newTrade;
};

// ─── getAllTrades ─────────────────────────────────────────────────────────────

module.exports.getAllTrades = async (userId) => {
    return tradeModel
        .find({ user: userId })
        .sort({ createdAt: -1 })
        .lean();
};

// ─── getTrade ─────────────────────────────────────────────────────────────────

module.exports.getTrade = async (tradeId, userId) => {
    const trade = await tradeModel.findOne({ _id: tradeId, user: userId }).lean();
    if (!trade) throw httpError(404, 'Trade not found');
    return trade;
};

// ─── closeTrade ───────────────────────────────────────────────────────────────

module.exports.closeTrade = async (tradeId, closePrice, closeDate, closeQuantity, userId) => {

    // Ownership check built into the query
    const trade = await tradeModel.findOne({ _id: tradeId, user: userId });
    if (!trade) throw httpError(404, 'Trade not found');

    if (trade.status === 'closed') {
        throw httpError(400, 'Trade is already closed');
    }

    if (closeQuantity > trade.quantity) {
        throw httpError(400, 'Close quantity exceeds remaining trade quantity');
    }

    // Set the closing price/date on the opposite side of the entry
    if (trade.entryType === 'buy') {
        trade.sellPrice = closePrice;
        trade.sellDate = closeDate;
    } else {
        trade.buyPrice = closePrice;
        trade.buyDate = closeDate;
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

    // Update user's total profit and remove trade reference if fully closed
    if (trade.status === 'closed') {
        await userModel.findByIdAndUpdate(trade.user, {
            $pull: { trades: trade._id },
            $inc: { totalProfit: trade.finalProfit },
        });
    }

    return trade;
};

// ─── updateTrade ──────────────────────────────────────────────────────────────

module.exports.updateTrade = async (tradeId, tradeData, userId) => {

    const trade = await tradeModel.findOne({ _id: tradeId, user: userId });
    if (!trade) throw httpError(404, 'Trade not found');

    // Strip fields that must never be manually overwritten
    const { profit, finalProfit, user, status, ...safeData } = tradeData;

    Object.keys(safeData).forEach(key => {
        if (trade[key] !== undefined) {
            trade[key] = safeData[key];
        }
    });

    await trade.save();
    return trade;
};

// ─── deleteTrade ──────────────────────────────────────────────────────────────

module.exports.deleteTrade = async (tradeId, userId) => {

    // Ownership check built into the query — only deletes if it belongs to this user
    const deleted = await tradeModel.findOneAndDelete({ _id: tradeId, user: userId });
    if (!deleted) throw httpError(404, 'Trade not found');

    await userModel.findByIdAndUpdate(userId, {
        $pull: { trades: tradeId },
    });

    return deleted;
};

// ─── getStockPrice ────────────────────────────────────────────────────────────

module.exports.getStockPrice = async (symbol) => {
    const upperSymbol = symbol.toUpperCase();
    if (!/^[A-Z0-9]+$/.test(upperSymbol)) {
        throw httpError(404, 'Trade not found');
    }
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${upperSymbol}`;

    const cookieJar = new tough.CookieJar();

    const client = wrapper(axios.create({
        jar: cookieJar,
        withCredentials: true,
        timeout: 5000,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": `https://www.nseindia.com/get-quotes/equity?symbol=${upperSymbol}`,
            "Connection": "keep-alive",
        }
    }));

    // Step 1: Get cookies
    await client.get("https://www.nseindia.com");

    // Step 2: Fetch data
    const response = await client.get(url);

    const lastPrice = response.data?.priceInfo?.lastPrice;

    if (typeof lastPrice !== "number") {
        throw new Error(`Invalid symbol or data not found: ${upperSymbol}`);
    }

    return lastPrice;
};
