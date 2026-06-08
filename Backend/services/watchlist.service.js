const mongoose = require("mongoose");
const watchlistModel = require("../models/watchlist.model");
const userModel = require("../models/user.model");
const tradeService = require("../services/trade.service");

const MAX_STOCKS = 10;

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// ── Create Watchlist ──────────────────────────────────────────────────────────

module.exports.createWatchlist = async ({ watchlistName, user }) => {
  const watchlist = await watchlistModel.create({
    watchlistName: watchlistName.trim(),
    user: user._id,
  });

  // ✅ $push instead of user.save() — no risk of overwriting other user fields
  await userModel.findByIdAndUpdate(user._id, {
    $push: { watchlists: watchlist._id },
  });

  return watchlist;
};

// ── Get All Watchlists ────────────────────────────────────────────────────────

module.exports.getWatchlist = async (userId) => {
  // ── Get All Watchlists ────────────────────────────────────────────────────────

  const watchlists = await watchlistModel
    .find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  if (!watchlists.length) return watchlists;

  // ✅ Collect unique symbols across ALL watchlists in one pass
  const uniqueSymbols = [
    ...new Set(watchlists.flatMap((w) => w.stocks.map((s) => s.stockSymbol))),
  ];

  // ✅ Fetch all prices in parallel — one round, not per-stock
  const priceMap = {};
  await Promise.allSettled(
    uniqueSymbols.map(async (symbol) => {
      try {
        priceMap[symbol] = await tradeService.getStockPrice(symbol);
      } catch {
        priceMap[symbol] = null;
      }
    }),
  );

  // ✅ Inject currentPrice into each stock across all watchlists
  return watchlists.map((watchlist) => ({
    ...watchlist,
    stocks: watchlist.stocks.map((stock) => ({
      ...stock,
      currentPrice: priceMap[stock.stockSymbol] ?? null,
    })),
  }));
};

// ── Get Watchlist By ID ───────────────────────────────────────────────────────

module.exports.getWatchlistById = async (watchlistId, userId) => {
  const watchlist = await watchlistModel
    .findOne({ _id: watchlistId, user: userId })
    .lean();

  if (!watchlist) throw httpError(404, "Watchlist not found.");
  return watchlist;
};

// ── Add Stocks ────────────────────────────────────────────────────────────────

module.exports.addStocks = async ({ watchlistId, stocks, userId }) => {
  const watchlist = await watchlistModel.findOne({
    _id: watchlistId,
    user: userId,
  });
  if (!watchlist) throw httpError(404, "Watchlist not found.");

  // Normalize incoming stocks
  const incoming = stocks.map((s) => ({
    stockName: s.stockName.trim(),
    stockSymbol: s.stockSymbol.trim().toUpperCase(),
  }));

  // Duplicate symbols within the request
  const incomingSymbols = incoming.map((s) => s.stockSymbol);
  if (new Set(incomingSymbols).size !== incomingSymbols.length) {
    throw httpError(400, "Duplicate stock symbols in request.");
  }

  const availableSlots = MAX_STOCKS - watchlist.stocks.length;
  if (availableSlots <= 0) {
    throw httpError(
      400,
      "Watchlist already contains the maximum of 10 stocks.",
    );
  }

  // Filter out already-existing symbols
  const existingSymbols = new Set(watchlist.stocks.map((s) => s.stockSymbol));
  const newStocks = incoming.filter((s) => !existingSymbols.has(s.stockSymbol));

  if (newStocks.length === 0) {
    throw httpError(400, "All provided stocks already exist in the watchlist.");
  }
  if (newStocks.length > availableSlots) {
    throw httpError(
      400,
      `Only ${availableSlots} slot(s) available. Cannot add ${newStocks.length} stocks.`,
    );
  }

  // ✅ Single $push with $each — one DB call instead of save()
  return await watchlistModel.findByIdAndUpdate(
    watchlistId,
    { $push: { stocks: { $each: newStocks } } },
    { new: true },
  );
};

// ── Delete Stock ──────────────────────────────────────────────────────────────

module.exports.deleteStock = async ({ watchlistId, stockId, userId }) => {
  const result = await watchlistModel.findOneAndUpdate(
    { _id: watchlistId, user: userId },
    { $pull: { stocks: { _id: new mongoose.Types.ObjectId(stockId) } } },
    { new: true },
  );

  if (!result) throw httpError(404, "Watchlist or stock not found.");
  return result;
};

// ── Update Watchlist ──────────────────────────────────────────────────────────

module.exports.updateWatchlist = async ({ id, watchlistName, stocks }) => {
  const bulkOps = [];

  // ✅ Rename watchlist
  if (watchlistName) {
    bulkOps.push({
      updateOne: {
        filter: { _id: id },
        update: { $set: { watchlistName: watchlistName.trim() } },
      },
    });
  }

  // ✅ Update individual stocks — one bulkWrite instead of N queries
  if (Array.isArray(stocks) && stocks.length > 0) {
    for (const stock of stocks) {
      const { stockId, stockName, stockSymbol } = stock;
      if (!stockId) continue;

      const fields = {};
      if (stockName) fields["stocks.$.stockName"] = stockName.trim();
      if (stockSymbol)
        fields["stocks.$.stockSymbol"] = stockSymbol.trim().toUpperCase();

      if (Object.keys(fields).length > 0) {
        bulkOps.push({
          updateOne: {
            filter: {
              _id: id,
              "stocks._id": new mongoose.Types.ObjectId(stockId),
            },
            update: { $set: fields },
          },
        });
      }
    }
  }

  // ✅ All updates in a single round-trip
  if (bulkOps.length > 0) {
    await watchlistModel.bulkWrite(bulkOps);
  }

  return await watchlistModel.findById(id).lean();
};

// ── Delete Watchlist ──────────────────────────────────────────────────────────

module.exports.deleteWatchlist = async ({ watchlistId, userId }) => {
  const deleted = await watchlistModel.findOneAndDelete({
    _id: watchlistId,
    user: userId,
  });

  if (!deleted) throw httpError(404, "Watchlist not found.");

  // ✅ Cast to ObjectId — same fix as trades
  await userModel.findByIdAndUpdate(userId, {
    $pull: { watchlists: new mongoose.Types.ObjectId(watchlistId) },
  });

  return deleted;
};
