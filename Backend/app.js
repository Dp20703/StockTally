const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require('./Routes/user.routes');
const tradeRoutes = require('./Routes/trade.routes');
const watchlistRoutes = require('./Routes/watchlist.routes');
const morgan = require('morgan');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/trades', tradeRoutes);
app.use('/watchlist', watchlistRoutes);

module.exports = app;
