const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    stockName: {
        type: String,
        required: [true, 'Stock name is required.'],
        trim: true,
    },
    stockSymbol: {
        type: String,
        required: [true, 'Stock symbol is required.'],
        trim: true,
        uppercase: true,
    },
    type: {
        type: String,
        enum: ['long', 'short'],
        required: true,
    },
    entryType: {
        type: String,
        enum: ['buy', 'sell'],
        required: true,
    },

    // ─── Quantity fields ──────────────────────────────────────────────────────
    openQty: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1.'],
    },
    closedQty: {
        type: Number,
        default: 0,
    },
    remainingQty: {
        type: Number,
        default: 0,
    },

    // ─── Price fields ─────────────────────────────────────────────────────────
    entryPrice:   { type: Number, required: true, min: 0.01 },
    entryDate:    { type: Date, required: true },
    avgExitPrice: { type: Number, default: null },
    lastExitDate: { type: Date, default: null },

    // ─── P&L ──────────────────────────────────────────────────────────────────
    realizedPnL: { type: Number, default: 0 },

    // ─── Status ───────────────────────────────────────────────────────────────
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    closedAt: { type: Date, default: null },

}, {
    timestamps: true,                  // createdAt + updatedAt auto-managed
    toJSON:   { virtuals: true },      // virtuals appear in res.json()
    toObject: { virtuals: true },
});

// ─── Pre-save: always derive remainingQty — can never be out of sync ──────────
tradeSchema.pre('save', function (next) {
    this.remainingQty = this.openQty - this.closedQty;
    next();
});

// ─── Virtual: unrealizedPnL — computed on read, never stored ──────────────────
// _currentMarketPrice is injected temporarily by the service layer
tradeSchema.virtual('unrealizedPnL').get(function () {
    if (this.status === 'closed' || this.remainingQty <= 0) return 0;
    if (!this._currentMarketPrice) return null;

    if (this.type === 'long') {
        // gain when price rises
        return (this._currentMarketPrice - this.entryPrice) * this.remainingQty;
    }

    if (this.entryType === 'sell') {
        // classic short: gain when price falls
        return (this.entryPrice - this._currentMarketPrice) * this.remainingQty;
    }

    // short/buy: gain when price rises
    return (this._currentMarketPrice - this.entryPrice) * this.remainingQty;
});

// ─── Virtual: currentMarketPrice — expose injected price in JSON output ───────
tradeSchema.virtual('currentMarketPrice').get(function () {
    return this._currentMarketPrice ?? null;
});

const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;