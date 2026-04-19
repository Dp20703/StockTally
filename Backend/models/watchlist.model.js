const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
    {
        stockName: {
            type: String,
            required: true,
            trim: true,
        },
        stockSymbol: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
    },
    { timestamps: true }
);

const watchlistSchema = new mongoose.Schema(
    {
        watchlistName: {
            type: String,
            required: true,
            trim: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        stocks: {
            type: [stockSchema],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Watchlist', watchlistSchema);
