import {
  useContext,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import api from "services/apiClient";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("open");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTrades = useCallback(
    async (customPage = 1) => {
      try {
        setLoading(true);

        // ✅ open section sends status=open to backend
        // backend already handles open+partial for status=open
        const queryStatus = status === "closed" ? "closed" : "open";

        const response = await api.get(
          `/trades/get_all_trades?page=${customPage}&limit=10&search=${debouncedSearch}&status=${queryStatus}`,
        );

        setTrades(response?.data?.trades || []);
        setTotalPages(response?.data?.totalPages || 1);
        setPage(customPage);
      } catch (error) {
        console.error(
          error?.response?.data?.message || "Error fetching trades",
        );
        setTrades([]);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, status],
  );

  const nextPage = () => {
    if (page < totalPages) fetchTrades(page + 1);
  };
  const prevPage = () => {
    if (page > 1) fetchTrades(page - 1);
  };
  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) fetchTrades(p);
  };

  return (
    <TradeContext.Provider
      value={{
        trades,
        loading,
        page,
        totalPages,
        search,
        setSearch,
        status,
        setStatus,
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
