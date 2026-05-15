const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    stockName:   { type: String, required: [true, 'Stock name is required.'], trim: true },
    stockSymbol: { type: String, required: [true, 'Stock symbol is required.'], trim: true, uppercase: true },
    type:        { type: String, enum: ['long', 'short'], required: true },
    entryType:   { type: String, enum: ['buy', 'sell'], required: true },

    // ─── Quantity ─────────────────────────────────────────────────────────────
    openQty:      { type: Number, required: true, min: [1, 'Quantity must be at least 1.'] },
    closedQty:    { type: Number, default: 0 },
    remainingQty: { type: Number, default: 0 },

    // ─── Price ────────────────────────────────────────────────────────────────
    entryPrice:   { type: Number, required: true, min: 0.01 },
    entryDate:    { type: Date, required: true },
    avgExitPrice: { type: Number, default: null },
    lastExitDate: { type: Date, default: null },

    // ─── P&L ──────────────────────────────────────────────────────────────────
    realizedPnL: { type: Number, default: 0 },

    // ─── Status ───────────────────────────────────────────────────────────────
    status:   { type: String, enum: ['open', 'partial', 'closed'], default: 'open' },
    closedAt: { type: Date, default: null },

}, {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
});

// remainingQty always derived — can never be out of sync
tradeSchema.pre('save', function (next) {
    this.remainingQty = this.openQty - this.closedQty;
    next();
});

// unrealizedPnL — never stored, computed on read
tradeSchema.virtual('unrealizedPnL').get(function () {
    if (this.status === 'closed' || this.remainingQty <= 0) return 0;
    if (!this._currentMarketPrice) return null;

    if (this.type === 'long')        return (this._currentMarketPrice - this.entryPrice) * this.remainingQty;
    if (this.entryType === 'sell')   return (this.entryPrice - this._currentMarketPrice) * this.remainingQty;
    return (this._currentMarketPrice - this.entryPrice) * this.remainingQty;
});

tradeSchema.virtual('currentMarketPrice').get(function () {
    return this._currentMarketPrice ?? null;
});

module.exports = mongoose.model('Trade', tradeSchema);