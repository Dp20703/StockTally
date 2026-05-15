const tradeModel = require('../models/trade.model');
const userModel  = require('../models/user.model');
const axios      = require('axios');
const NodeCache  = require('node-cache');
const cache      = new NodeCache({ stdTTL: 60 });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function httpError(status, message) {
    const err = new Error(message);
    err.status = status;
    return err;
}

async function fetchWithRetry(fn, retries = 2) {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw httpError(502, 'Failed to fetch price after retries');
        await new Promise(r => setTimeout(r, 500));
        return fetchWithRetry(fn, retries - 1);
    }
}

// ─── P&L Calculators ─────────────────────────────────────────────────────────

/**
 * Realized P&L — called on every close leg
 *
 *  long  / buy:  gain when price rises  → (exit - entry) * qty
 *  short / sell: gain when price falls  → (entry - exit) * qty
 *  short / buy:  gain when price rises  → (exit - entry) * qty
 */
function calcRealizedPnL({ type, entryType, entryPrice, exitPrice, qty }) {
    if (type === 'long') {
        return (exitPrice - entryPrice) * qty;
    }
    if (entryType === 'sell') {
        return (entryPrice - exitPrice) * qty;
    }
    return (exitPrice - entryPrice) * qty;
}

// ─── createTrade ──────────────────────────────────────────────────────────────

module.exports.createTrade = async (user, tradeData) => {
    const { stockName, stockSymbol, quantity, type, entryType, price, date } = tradeData;

    const newTrade = await tradeModel.create({
        user:        user._id,
        stockName,
        stockSymbol,
        type,
        entryType,
        openQty:     quantity,
        closedQty:   0,
        entryPrice:  price,
        entryDate:   date,
        status:      'open',
        realizedPnL: 0,
    });

    await userModel.findByIdAndUpdate(user._id, {
        $push: { trades: newTrade._id },
    });

    return newTrade;
};

// ─── getAllTrades ─────────────────────────────────────────────────────────────

module.exports.getAllTrades = async (userId, page = 1, limit = 10, search = '', status = 'open') => {
    const skip = (page - 1) * limit;

    const query = {
        user: userId,
        ...(status && { status }),
        ...(search && {
            $or: [
                { stockName:   { $regex: search, $options: 'i' } },
                { stockSymbol: { $regex: search, $options: 'i' } },
            ],
        }),
    };

    const [total, trades] = await Promise.all([
        tradeModel.countDocuments(query),
        tradeModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        // no .lean() — virtuals must fire
    ]);

    // Batch fetch prices for all open/partial trades in one parallel round
    const activeTrades   = trades.filter(t => t.status !== 'closed' && t.remainingQty > 0);
    const uniqueSymbols  = [...new Set(activeTrades.map(t => t.stockSymbol))];

    const priceMap = {};
    await Promise.allSettled(
        uniqueSymbols.map(async symbol => {
            try {
                priceMap[symbol] = await module.exports.getStockPrice(symbol);
            } catch {
                priceMap[symbol] = null;
            }
        })
    );

    // Inject market price so the virtual can compute unrealizedPnL
    trades.forEach(trade => {
        if (trade.status !== 'closed' && trade.remainingQty > 0) {
            trade._currentMarketPrice = priceMap[trade.stockSymbol] ?? null;
        }
    });

    return {
        trades,
        currentPage:  page,
        totalPages:   Math.ceil(total / limit),
        totalItems:   total,
    };
};

// ─── getTrade ─────────────────────────────────────────────────────────────────

module.exports.getTrade = async (tradeId, userId) => {
    // no .lean() — virtuals must fire
    const trade = await tradeModel.findOne({ _id: tradeId, user: userId });
    if (!trade) throw httpError(404, 'Trade not found');

    if (trade.status !== 'closed' && trade.remainingQty > 0) {
        try {
            trade._currentMarketPrice = await module.exports.getStockPrice(trade.stockSymbol);
        } catch {
            trade._currentMarketPrice = null;
        }
    }

    return trade;
};

// ─── closeTrade ───────────────────────────────────────────────────────────────

module.exports.closeTrade = async (tradeId, closePrice, closeDate, closeQuantity, userId) => {

    const trade = await tradeModel.findOne({ _id: tradeId, user: userId });
    if (!trade) throw httpError(404, 'Trade not found');

    if (trade.status === 'closed') {
        throw httpError(400, 'Trade is already fully closed');
    }

    if (closeQuantity > trade.remainingQty) {
        throw httpError(400, `Cannot close ${closeQuantity}. Only ${trade.remainingQty} units remaining.`);
    }

    // P&L for this close leg only
    const legPnL = calcRealizedPnL({
        type:       trade.type,
        entryType:  trade.entryType,
        entryPrice: trade.entryPrice,
        exitPrice:  closePrice,
        qty:        closeQuantity,
    });

    // Weighted average exit price
    if (trade.avgExitPrice === null) {
        trade.avgExitPrice = closePrice;
    } else {
        trade.avgExitPrice =
            (trade.avgExitPrice * trade.closedQty + closePrice * closeQuantity) /
            (trade.closedQty + closeQuantity);
    }

    trade.closedQty   += closeQuantity;
    trade.realizedPnL += legPnL;
    trade.lastExitDate = closeDate;

    if (trade.closedQty >= trade.openQty) {
        trade.status   = 'closed';
        trade.closedAt = closeDate;
    } 

    // pre-save hook derives remainingQty automatically
    await trade.save();

    await userModel.findByIdAndUpdate(trade.user, {
        $inc: { totalProfit: legPnL },
    });

    return trade;
};

// ─── updateTrade ──────────────────────────────────────────────────────────────

module.exports.updateTrade = async (tradeId, tradeData, userId) => {
    const trade = await tradeModel.findOne({ _id: tradeId, user: userId });
    if (!trade) throw httpError(404, 'Trade not found');

    const IMMUTABLE = [
        'user', 'status', 'realizedPnL',
        'closedQty', 'openQty', 'remainingQty', 'closedAt',
        'avgExitPrice', 'lastExitDate',
    ];

    Object.keys(tradeData).forEach(key => {
        if (!IMMUTABLE.includes(key)) {
            trade[key] = tradeData[key];
        }
    });

    await trade.save();
    return trade;
};

// ─── deleteTrade ──────────────────────────────────────────────────────────────

module.exports.deleteTrade = async (tradeId, userId) => {
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
        throw httpError(400, 'Invalid stock symbol');
    }

    const cached = cache.get(upperSymbol);
    if (cached) return cached;

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${upperSymbol}.NS`;

    const response = await fetchWithRetry(() => axios.get(url));
    const price    = response.data?.chart?.result?.[0]?.meta?.regularMarketPrice;

    if (typeof price !== 'number') {
        throw httpError(404, `Stock not found: ${upperSymbol}`);
    }

    cache.set(upperSymbol, price);
    return price;
};