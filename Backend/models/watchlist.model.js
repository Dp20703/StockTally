const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: true,
    },
    stockSymbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

const watchlistSchema = new mongoose.Schema({
    watchlistName: {
        type: String,
        required: true,
        unique: true
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    stocks: {
        type: [stockSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Watchlist', watchlistSchema);