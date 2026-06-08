import { createContext, useCallback, useState } from "react";
import * as watchlistService from "../services/watchlistService";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlistId, setWatchlistId] = useState(null);
  const [watchlists, setWatchlists] = useState([]);

  const fetchWatchlists = useCallback(async () => {
    const data = await watchlistService.getWatchlists();

    setWatchlists(data.watchlists || []);
  }, []);

  const createWatchlist = async (payload) => {
    const data = await watchlistService.createWatchlist(payload);

    setWatchlists((prev) => [data.watchlist, ...prev]);

    return data.watchlist;
  };

  const updateWatchlist = async (id, payload) => {
    const data = await watchlistService.updateWatchlist(id, payload);

    setWatchlists((prev) => prev.map((w) => (w._id === id ? data.updated : w)));

    return data.updated;
  };

  const removeWatchlist = async (id) => {
    await watchlistService.deleteWatchlist(id);

    setWatchlists((prev) => prev.filter((w) => w._id !== id));
  };

  const addStocks = async (payload) => {
    const data = await watchlistService.addStocks(payload);

    setWatchlists((prev) =>
      prev.map((w) => (w._id === data.watchlist._id ? data.watchlist : w)),
    );

    return data.watchlist;
  };

  const removeStock = async (watchlistId, stockId) => {
    const data = await watchlistService.deleteStock(watchlistId, stockId);

    setWatchlists((prev) =>
      prev.map((w) => (w._id === watchlistId ? data.watchlist : w)),
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlists,

        watchlistId,
        setWatchlistId,

        fetchWatchlists,

        createWatchlist,
        updateWatchlist,

        removeWatchlist,

        addStocks,
        removeStock,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
