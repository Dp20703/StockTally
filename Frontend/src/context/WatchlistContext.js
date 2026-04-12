import api from "../Services/apiClient";
import { useState, useContext, createContext, useCallback } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlists, setWatchlists] = useState([]);

    const fetchWatchlist = useCallback(async () => {
        try {
            const res = await api.get("/watchlist/get");
            setWatchlists(res?.data || []);
        } catch (error) {
            console.error(
                error?.response?.data?.message || "Failed to fetch watchlists"
            );
        }
    }, []);

    return (
        <WatchlistContext.Provider value={{ fetchWatchlist, watchlists }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlists = () => useContext(WatchlistContext);