const tradeModel = require('../models/trade.model');

// create a new trade
module.exports.createTrade = async (userId, trade) => {
    const { stockName, stockSymbol, buyPrice, buyDate, quantity } = trade;
    const newTrade = await tradeModel.create({ user: userId, stockName, stockSymbol, buyPrice, buyDate, quantity });
    return newTrade;
}
