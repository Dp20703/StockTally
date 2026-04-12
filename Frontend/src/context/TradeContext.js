import { useContext, useState, createContext, useCallback } from "react";
import api from "../Services/apiClient";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {

    const [trades, setTrades] = useState([]);

    const fetchTrades = useCallback(async () => {
        try {
            const response = await api.get("/trades/get_all_trades");
            setTrades(response?.data?.trades || []);
        } catch (error) {
            console.error(error?.response?.data?.message || "Error fetching trades");
            setTrades([]);
        }
    }, []);

    return (
        <TradeContext.Provider value={{ trades, setTrades, fetchTrades }}>
            {children}
        </TradeContext.Provider>
    );
};

export const useTrades = () => useContext(TradeContext);