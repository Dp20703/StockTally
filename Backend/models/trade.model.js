const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Link to the User model
        required: true
    },
    stockName: {
        type: String,
        required: [true, "Stock name is required."],
        trim: true,
    },
    stockSymbol: {
        type: String,
        required: [true, "Stock symbol is required."],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [1, "Quantity must be at least 1."],
    },
    buyPrice: {
        type: Number,
        required: [true, "Buy price is required."],
        min: [0, "Buy price must be greater than zero."]
    },
    buyDate: {
        type: Date,
        required: [true, "Buy date is required."],
    },
    sellPrice: {
        type: Number,
        default: null, // Initially null, to be updated after the sell
        min: [0, "Sell price must be greater than zero."]
    },
    sellDate: {
        type: Date,
        default: null, // Initially null, to be updated after the sell
    },
    status: {
        type: String,
        enum: ['open', 'closed'], // "open" means the trade is still active, "closed" means the trade has been completed
        default: 'open',
    },
    profit: {
        type: Number,
        default: 0, // Profit will be calculated when trade is closed
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the "updatedAt" field before saving
tradeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Instance method to calculate profit when the trade is closed
tradeSchema.methods.calculateProfit = function () {
    if (this.status === 'closed' && this.sellPrice !== null && this.buyPrice !== null) {
        // Profit = (Sell Price - Buy Price) * Quantity
        this.profit = (this.sellPrice - this.buyPrice) * this.quantity;
    }
};

// Static method to close a trade and calculate profit
tradeSchema.statics.closeTrade = async function (tradeId, sellPrice, sellDate) {
    const trade = await this.findById(tradeId);
    if (!trade) throw new Error('Trade not found');

    if (trade.status === 'closed') throw new Error('Trade is already closed');

    // Set the sell details
    trade.sellPrice = sellPrice;
    trade.sellDate = sellDate;
    trade.status = 'closed';

    // Calculate the profit
    trade.calculateProfit();

    // Save the updated trade
    await trade.save();
    return trade;
};

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
