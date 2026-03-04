const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

const userRoutes = require('./Routes/user.routes');
const tradeRoutes = require('./Routes/trade.routes');
const watchlistRoutes = require('./Routes/watchlist.routes');

app.use(helmet());


const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.LOCALHOST_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.use('/users', userRoutes);
app.use('/trades', tradeRoutes);
app.use('/watchlist', watchlistRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;