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

// Instance method to calculate profit when the trade is closed// models/trade.model.js

// models/trade.model.js

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

// Static method to close a trade and calculate profit
// tradeSchema.statics.closeTrade = async function (tradeId, closePrice, closeDate, closeQuantity) {
//     // Find the trade by ID
//     const trade = await this.findById(tradeId);
//     if (!trade) throw new Error('Trade not found');

//     // Check if the trade is already closed
//     if (trade.status === 'closed') throw new Error('Trade already closed');


//     // Check if closeQuantity is greater than trade quantity
//     if (closeQuantity > trade.quantity) throw new Error('Close quantity is greater than trade quantity');

//     // Check that the trade has the correct entry type and price set
//     if (trade.entryType === 'buy') {
//         if (trade.buyPrice === null) throw new Error('Buy price not set');

//         // Check for trade type (long/short)
//         if (trade.type === 'long') {
//             // For long buy trades, we sell the stock at the sell price
//             trade.sellPrice = closePrice;
//             trade.sellDate = closeDate;
//         } else if (trade.type === 'short') {
//             // For short buy trades, we buy the stock to close the position
//             trade.sellPrice = closePrice;
//             trade.sellDate = closeDate;
//         } else {
//             throw new Error('Invalid trade type. Must be "long" or "short".');
//         }

//     } else if (trade.entryType === 'sell') {
//         if (trade.sellPrice === null) throw new Error('Sell price not set');

//         // Check for trade type (long/short)
//         if (trade.type === 'long') {
//             // For long sell trades, we buy the stock to close the position
//             trade.buyPrice = closePrice;
//             trade.buyDate = closeDate;
//         } else if (trade.type === 'short') {
//             // For short sell trades, we buy the stock to close the position
//             trade.buyPrice = closePrice;
//             trade.buyDate = closeDate;
//         } else {
//             throw new Error('Invalid trade type. Must be "long" or "short".');
//         }
//     } else {
//         throw new Error('Invalid entry type. Must be "buy" or "sell".');
//     }

//     // Handle partial selling: If less than the total quantity is sold, update the quantity and leave status as 'open'
//     if (closeQuantity < trade.quantity) {
//         trade.quantity -= closeQuantity;  // Reduce the remaining quantity
//         trade.status = 'open';           // Trade stays open
//     } else {
//         // If the entire quantity is sold, mark the trade as 'closed'
//         trade.quantity = 0
//         trade.status = 'closed';         // Fully close the trade
//     }

//     // Calculate profit based on the quantity sold (partial or full)
//     trade.calculateProfit(closeQuantity);

//     // Save the updated trade document
//     await trade.save();
//     return trade;
// };

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
