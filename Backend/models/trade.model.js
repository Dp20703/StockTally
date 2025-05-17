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

    },
    originalQuantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [1, "Quantity must be at least 1."],
    },
    type: {
        type: String,
        enum: ['long', 'short'],
        required: true,
    },
    entryType: {
        type: String,
        enum: ['buy', 'sell'], // What was the first action: a buy or a sell?
        required: true,
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
    finalProfit: {
        type: Number,
        default: 0
    }, // Final profit for closed trades
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
tradeSchema.methods.calculateProfit = function (closeQuantity) {
    if (this.buyPrice !== null && this.sellPrice !== null) {
        let quantitySold = closeQuantity || this.quantity;  // Use passed quantity or full trade quantity

        // Calculate profit based on the price difference and quantity sold
        this.profit = (this.sellPrice - this.buyPrice) * quantitySold;

        // Reverse the profit/loss calculation for short trades
        if (this.type === 'short') {
            this.profit *= -1;  // Profit is reversed in short trades
        }

        // If trade is fully closed, finalize the profit calculation
        if (this.status === 'closed' && this.quantity === 0) {
            // Finalize the profit calculation when the trade is fully closed
            this.finalProfit = this.profit;
            this.profit = null;
        }
    }
};

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
