const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/trade.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validateRequest");
const {
  validateCreateTrade,
  validateCloseTrade,
  validateUpdateTrade,
  validateAddPosition,
} = require("../validators/trade.validators");

// POST /trades/create
router.post(
  "/create",
  authMiddleware.authUser,
  validateCreateTrade,
  validateRequest,
  tradeController.createTrade,
);

// GET /trades/get_all_trades
router.get(
  "/get_all_trades",
  authMiddleware.authUser,
  tradeController.getAllTrades,
);

// GET /trades/get_trade/:tradeId
router.get(
  "/get_trade/:tradeId",
  authMiddleware.authUser,
  tradeController.getTrade,
);

// POST /trades/close/:tradeId
router.post(
  "/close/:tradeId",
  authMiddleware.authUser,
  validateCloseTrade,
  validateRequest,
  tradeController.closeTrade,
);

// PUT /trades/update/:tradeId
router.put(
  "/update/:tradeId",
  authMiddleware.authUser,
  validateUpdateTrade,
  validateRequest,
  tradeController.updateTrade,
);

// DELETE /trades/delete/:tradeId
router.delete(
  "/delete/:tradeId",
  authMiddleware.authUser,
  tradeController.deleteTrade,
);

// GET /trades/price/:stockSymbol
router.get(
  "/price/:stockSymbol",
  authMiddleware.authUser,
  tradeController.getStockPrice,
);

// POST /trades/add-position/:tradeId
router.post(
  "/add-position/:tradeId",
  authMiddleware.authUser,
  validateAddPosition,
  validateRequest,
  tradeController.addPosition,
);

module.exports = router;
