const { body } = require("express-validator");

const cleanEmpty = (value) =>
  value === "" || value === null ? undefined : value;

// ─── createTrade ──────────────────────────────────────────────────────────────

module.exports.validateCreateTrade = [
  body("stockName")
    .notEmpty()
    .withMessage("Stock name is required.")
    .isString()
    .withMessage("Stock name must be a string.")
    .trim(),

  body("stockSymbol")
    .notEmpty()
    .withMessage("Stock symbol is required.")
    .isString()
    .withMessage("Stock symbol must be a string.")
    .trim()
    .toUpperCase(),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),

  body("entryType")
    .isIn(["buy", "sell"])
    .withMessage('Entry type must be "buy" or "sell".'),

  body("type")
    .isIn(["long", "short"])
    .withMessage('Type must be "long" or "short".'),

  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be greater than 0."),

  body("date")
    .isISO8601()
    .toDate()
    .withMessage("A valid entry date is required."),

  // long can only open with buy
  // short can open with either buy or sell — no restriction
  body("entryType").custom((entryType, { req }) => {
    if (req.body.type === "long" && entryType !== "buy") {
      throw new Error('Long trades must open with entryType "buy".');
    }
    return true;
  }),
];

// ─── closeTrade ───────────────────────────────────────────────────────────────

module.exports.validateCloseTrade = [
  body("closePrice")
    .isFloat({ min: 0.01 })
    .withMessage("Close price must be greater than 0."),

  body("closeDate")
    .isISO8601()
    .toDate()
    .withMessage("A valid close date is required."),

  body("closeQuantity")
    .isInt({ min: 1 })
    .withMessage("Close quantity must be at least 1."),
];

// ─── updateTrade ──────────────────────────────────────────────────────────────

module.exports.validateUpdateTrade = [
  body("stockName")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .withMessage("Stock name must be a string.")
    .trim(),

  body("stockSymbol")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .withMessage("Stock symbol must be a string.")
    .trim()
    .toUpperCase(),

  body("entryType")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["buy", "sell"])
    .withMessage('Entry type must be "buy" or "sell".'),

  body("type")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isIn(["long", "short"])
    .withMessage('Type must be "long" or "short".'),

  body("entryPrice")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: 0.01 })
    .withMessage("Entry price must be greater than 0."),

  body("entryDate")
    .customSanitizer(cleanEmpty)
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Entry date must be a valid date."),

  // ─── Immutable fields — reject loudly so client knows immediately ─────────
  //   body("openQty")
  //     .not()
  //     .exists()
  //     .withMessage("openQty cannot be updated manually."),
  //   body("closedQty")
  //     .not()
  //     .exists()
  //     .withMessage("closedQty cannot be updated manually."),
  //   body("remainingQty")
  //     .not()
  //     .exists()
  //     .withMessage("remainingQty cannot be updated manually."),
  //   body("realizedPnL")
  //     .not()
  //     .exists()
  //     .withMessage("realizedPnL cannot be updated manually."),
  //   body("status")
  //     .not()
  //     .exists()
  //     .withMessage("status cannot be updated manually."),
  //   body("closedAt")
  //     .not()
  //     .exists()
  //     .withMessage("closedAt cannot be updated manually."),
  //   body("avgExitPrice")
  //     .not()
  //     .exists()
  //     .withMessage("avgExitPrice cannot be updated manually."),
  //   body("lastExitDate")
  //     .not()
  //     .exists()
  //     .withMessage("lastExitDate cannot be updated manually."),
];

// ─── addPosition ─────────────────────────────────────────────────────────────

module.exports.validateAddPosition = [
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),

  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be greater than 0."),

  body("date")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date."),
];
