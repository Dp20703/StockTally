import { useContext, useState, createContext, useCallback } from "react";
import api from "services/apiClient";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTrades = useCallback(async (customPage = 1) => {
    try {
      setLoading(true);

      const response = await api.get(
        `/trades/get_all_trades?page=${customPage}&limit=10`,
      );

      setTrades(response?.data?.trades || []);
      setTotalPages(response?.data?.totalPages || 1);
      setPage(customPage);
    } catch (error) {
      console.error(error?.response?.data?.message || "Error fetching trades");
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Pagination helpers ───────────────────── */

  const nextPage = () => {
    if (page < totalPages) {
      fetchTrades(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      fetchTrades(page - 1);
    }
  };

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      fetchTrades(p);
    }
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        loading,
        page,
        totalPages,
        fetchTrades,
        nextPage,
        prevPage,
        goToPage,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrades = () => useContext(TradeContext);
