import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react"

const TradeContext = createContext();
export const TradeProvider = ({ children }) => {
    const [trades, setTrades] = useState([])
    // Fetch all trades
    const fetchTrades = async () => {
        const allTrades = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trades/get_all_trades`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setTrades(allTrades.data.trades || []);
    }

    return <TradeContext.Provider value={{ trades, setTrades, fetchTrades }}>
        {children}
    </TradeContext.Provider>
};

export const useTrades = () => useContext(TradeContext);