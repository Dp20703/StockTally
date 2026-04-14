import { useState } from "react";
import { toast } from "react-toastify";
import { useWatchlists } from "../../../context/WatchlistContext";
import api from "../../../services/apiClient";
import { Modal } from "../../ui/Modal";

export default function AddStock({
  setAddStockModal,
  watchlistId,
  setUpdateModal,
}) {
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

      toast.success("Stocks added successfully", {
        position: "top-right",
        autoClose: 1000,
      });
      setAddStockModal(false);
      setUpdateModal(false);
      fetchWatchlist();
    } catch {
      toast.error("Failed to add stocks");
      setAddStockModal(false);
    }
  };

  return (
    <Modal title="Add Stocks" onClose={() => setAddStockModal(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-3">
          {stocks.map((stock, index) => (
            <div key={index} className="st-card p-3 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-text-muted">
                  Stock {index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </div>

              <input
                name="stockName"
                value={stock.stockName}
                onChange={(e) => handleChange(e, index)}
                className="st-input"
                placeholder="Stock name"
              />

              <input
                name="stockSymbol"
                value={stock.stockSymbol}
                onChange={(e) => handleChange(e, index)}
                className="st-input"
                placeholder="Stock symbol"
              />
            </div>
          ))}
        </div>

        <button type="button" onClick={handleAdd} className="st-btn-ghost">
          + Add Another
        </button>

        <button type="submit" className="st-btn-green">
          Submit Stocks
        </button>
      </form>
    </Modal>
  );
}
