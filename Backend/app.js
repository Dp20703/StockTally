const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();

/* Routes */
const userRoutes = require("./routes/user.routes");
const tradeRoutes = require("./routes/trade.routes");
const watchlistRoutes = require("./routes/watchlist.routes");

/* ─────────────────────────────────────────────
   Trust Proxy
───────────────────────────────────────────── */
app.set("trust proxy", 1);

/* ─────────────────────────────────────────────
   Security Middlewares
───────────────────────────────────────────── */
app.use(helmet());

/* ─────────────────────────────────────────────
   Rate Limiter
───────────────────────────────────────────── */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* ─────────────────────────────────────────────
   Allowed Origins
───────────────────────────────────────────── */
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL2,
  process.env.LOCALHOST_URL,
];

/* ─────────────────────────────────────────────
   CORS
───────────────────────────────────────────── */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Origin not allowed"));
      }
    },

    credentials: true,
  })
);

/* ─────────────────────────────────────────────
   Parsers
───────────────────────────────────────────── */
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* ─────────────────────────────────────────────
   Logging (Development Only)
───────────────────────────────────────────── */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* ─────────────────────────────────────────────
   Routes
───────────────────────────────────────────── */
app.use("/users", userRoutes);
app.use("/trades", tradeRoutes);
app.use("/watchlist", watchlistRoutes);

/* ─────────────────────────────────────────────
   Health Check Route
───────────────────────────────────────────── */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StockTally API is running 🚀",
  });
});

/* ─────────────────────────────────────────────
   404 Handler
───────────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ─────────────────────────────────────────────
   Global Error Handler
───────────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

module.exports = app;