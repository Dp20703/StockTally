const tradeService = require("../services/trade.service");

function handleError(res, err, fallbackMessage) {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(fallbackMessage, err);
  return res.status(500).json({ message: "Internal server error." });
}

module.exports.createTrade = async (req, res) => {
  try {
    const { stockName, stockSymbol, quantity, type, entryType, price, date } =
      req.body;
    const trade = await tradeService.createTrade(req.user, {
      stockName,
      stockSymbol,
      quantity,
      type,
      entryType,
      price,
      date,
    });
    return res
      .status(201)
      .json({ success: true, message: "Trade created successfully", trade });
  } catch (err) {
    return handleError(res, err, "createTrade error:");
  }
};

module.exports.getAllTrades = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 10);
    const search = req.query.search || "";
    const status = req.query.status || "open";

    const data = await tradeService.getAllTrades(
      req.user._id,
      page,
      limit,
      search,
      status,
    );
    return res
      .status(200)
      .json({ success: true, message: "Fetched trades", ...data });
  } catch (err) {
    return handleError(res, err, "getAllTrades error:");
  }
};

module.exports.getTrade = async (req, res) => {
  try {
    const trade = await tradeService.getTrade(req.params.tradeId, req.user._id);
    return res
      .status(200)
      .json({ success: true, message: "Fetched trade", trade });
  } catch (err) {
    return handleError(res, err, "getTrade error:");
  }
};

module.exports.closeTrade = async (req, res) => {
  try {
    const { closePrice, closeDate, closeQuantity } = req.body;
    const trade = await tradeService.closeTrade(
      req.params.tradeId,
      closePrice,
      closeDate,
      closeQuantity,
      req.user._id,
    );

    return res
      .status(200)
      .json({ success: true, message: "Trade closed successfully", trade });
  } catch (err) {
    return handleError(res, err, "closeTrade error:");
  }
};

module.exports.updateTrade = async (req, res) => {
  try {
    const updatedTrade = await tradeService.updateTrade(
      req.params.tradeId,
      req.body,
      req.user._id,
    );
    return res.status(200).json({
      success: true,
      message: "Trade updated successfully",
      trade: updatedTrade,
    });
  } catch (err) {
    return handleError(res, err, "updateTrade error:");
  }
};

module.exports.deleteTrade = async (req, res) => {
  try {
    await tradeService.deleteTrade(req.params.tradeId, req.user._id);
    return res
      .status(200)
      .json({ success: true, message: "Trade deleted successfully" });
  } catch (err) {
    return handleError(res, err, "deleteTrade error:");
  }
};

module.exports.getStockPrice = async (req, res) => {
  try {
    const price = await tradeService.getStockPrice(req.params.stockSymbol);
    return res
      .status(200)
      .json({ success: true, message: "Fetched stock price", price });
  } catch (err) {
    return handleError(res, err, "getStockPrice error:");
  }
};

module.exports.addPosition = async (req, res) => {
  try {
    const { quantity, price, date } = req.body;

    const trade = await tradeService.addPosition(
      req.params.tradeId,
      quantity,
      price,
      date,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Position added successfully",
      trade,
    });
  } catch (err) {
    return handleError(res, err, "addPosition error:");
  }
};
