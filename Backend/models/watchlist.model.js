const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    stockName:   { type: String, required: true, trim: true },
    stockSymbol: { type: String, required: true, trim: true, uppercase: true },
}, { timestamps: true });

const watchlistSchema = new mongoose.Schema({
    watchlistName: { type: String, required: true, trim: true },
    user:          { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // ✅ lowercase 'user' — matches user.model.js
    stocks:        { type: [stockSchema], default: [] },
}, { timestamps: true });

// ✅ Compound unique index — one name per user, enforced at DB level
watchlistSchema.index({ user: 1, watchlistName: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);