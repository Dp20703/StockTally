import { useState } from "react";
import { toast } from "react-toastify";
import { useWatchlists } from "context/WatchlistContext";
import api from "services/apiClient";
import { useNavigate } from "react-router-dom";
import AddStockModal from "./AddStockModal";

export default function AddStock({
  setAddStockModal,
  watchlistId,
  setUpdateModal,
}) {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([{ stockName: "", stockSymbol: "" }]);
  const { fetchWatchlist } = useWatchlists();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...stocks];
    updated[index][name] = value;
    setStocks(updated);
  };

  const handleAdd = () => {
    setStocks([...stocks, { stockName: "", stockSymbol: "" }]);
  };

  const handleRemove = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/watchlist/add", { stocks, watchlistId });

      await fetchWatchlist?.();
      setAddStockModal(false);
      setUpdateModal(false);

      toast.success("Stocks added successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      navigate("/trade/watchlist");
    } catch {
      toast.error("Failed to add stocks");
      setAddStockModal(false);
    }
  };

  return (
    <AddStockModal
      setAddStockModal={setAddStockModal}
      stocks={stocks}
      handleChange={handleChange}
      handleAdd={handleAdd}
      handleRemove={handleRemove}
      handleSubmit={handleSubmit}
    />
  );
}
