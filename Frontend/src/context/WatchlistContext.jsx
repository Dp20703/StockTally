import api from "services/apiClient";
import { useState, useContext, createContext, useCallback } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlistId, setWatchlistId] = useState(null);
  const [watchlists, setWatchlists] = useState([]);

  const fetchWatchlist = useCallback(async () => {
    try {
      const res = await api.get("/watchlist/get");
      setWatchlists(res?.data?.watchlists || []);
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Failed to fetch watchlists",
      );
    }
  }, []);

  return (
    <WatchlistContext.Provider
      value={{ watchlistId, setWatchlistId, fetchWatchlist, watchlists }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlists = () => useContext(WatchlistContext);
