import { useState } from "react";
import { toast } from "react-toastify";

import useModal from "../../../hooks/useModal";
import useWatchlist from "../../../hooks/useWatchlist";

export default function AddStockForm() {
  const [stocks, setStocks] = useState([
    {
      stockName: "",
      stockSymbol: "",
    },
  ]);

  const { closeModal } = useModal();
  const { watchlistId, addStocks } = useWatchlist();

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setStocks((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return updated;
    });
  };

  const handleAdd = () => {
    setStocks((prev) => [
      ...prev,
      {
        stockName: "",
        stockSymbol: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setStocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStocks({ watchlistId, stocks });

      toast.success("Stocks added successfully");

      closeModal();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add stocks");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-3">
        {stocks.map((stock, index) => (
          <div key={index} className="st-card p-3 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-text-muted">Stock {index + 1}</span>

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
  );
}
