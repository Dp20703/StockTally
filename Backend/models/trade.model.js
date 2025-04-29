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
        default: null,
        min: 0,
    },
    buyDate: {
        type: Date,
        default: null,
    },
    sellPrice: {
        type: Number,
        default: null,
        min: 0,
    },
    sellDate: {
        type: Date,
        default: null,
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

// Update updatedAt before save
tradeSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Instance method to calculate profit when the trade is closed
tradeSchema.methods.calculateProfit = function () {
    if (this.status === 'closed' && this.buyPrice !== null && this.sellPrice !== null) {
        this.profit = (this.sellPrice - this.buyPrice) * this.quantity;
        if (this.type === 'short') {
            this.profit *= -1; // Reverse for short selling
        }
    }
};

// Static method to close a trade and calculate profit
tradeSchema.statics.closeTrade = async function (tradeId, sellPrice, sellDate) {
    const trade = await this.findById(tradeId);
    if (!trade) throw new Error('Trade not found');
    if (trade.status === 'closed') throw new Error('Trade already closed');

    if (trade.entryType === 'buy') {
        if (trade.buyPrice === null) throw new Error('Buy price not set');
        trade.sellPrice = closingPrice;
        trade.sellDate = closingDate;
    } else {
        if (trade.sellPrice === null) throw new Error('Sell price not set');
        trade.buyPrice = closingPrice;
        trade.buyDate = closingDate;
    }

    // Update trade status
    trade.status = 'closed';

    // Calculate the profit
    trade.calculateProfit();

    // Save the updated trade
    await trade.save();
    return trade;
};

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
