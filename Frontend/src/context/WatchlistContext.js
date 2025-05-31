import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
const { createContext } = require("react");

const WatchlistContext = createContext()

export const WatchlistProvider = ({ children }) => {
    const [watchlists, setWatchlists] = useState([]);

    const fetchWatchlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Unauthorized: No token provided');
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/watchlist/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setWatchlists(res.data);
        } catch (error) {
            console.error('Failed to fetch watchlists:', error);
            throw error;
        }
    }

    return <WatchlistContext.Provider value={{ fetchWatchlist, watchlists }}>
        {children}
    </WatchlistContext.Provider>
};

export const useWatchlists = () => useContext(WatchlistContext);