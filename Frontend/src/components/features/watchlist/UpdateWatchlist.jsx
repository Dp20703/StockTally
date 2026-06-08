import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useModal from "../../../hooks/useModal";
import useWatchlist from "../../../hooks/useWatchlist";

export default function UpdateWatchlist() {
  const { openModal, closeModal } = useModal();
  const { watchlistId, watchlists, updateWatchlist, removeStock } =
    useWatchlist();

  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    const watchlist = watchlists.find((w) => w._id === watchlistId);

    if (watchlist) {
      setUpdateData({
        ...watchlist,
      });
    }
  }, [watchlistId, watchlists]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStockChange = (e, index) => {
    const { name, value } = e.target;

    setUpdateData((prev) => {
      const stocks = [...prev.stocks];

      stocks[index] = {
        ...stocks[index],
        [name]: value,
      };

      return {
        ...prev,
        stocks,
      };
    });
  };

  const handleDeleteStock = async (stockId) => {
    try {
      await removeStock(watchlistId, stockId);

      setUpdateData((prev) => ({
        ...prev,
        stocks: prev.stocks.filter((stock) => stock._id !== stockId),
      }));

      toast.success("Stock removed");
    } catch {
      toast.error("Failed to remove stock");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateWatchlist(watchlistId, {
        watchlistName: updateData.watchlistName,

        stocks: updateData.stocks.map((stock) => ({
          stockId: stock._id,
          stockName: stock.stockName,
          stockSymbol: stock.stockSymbol,
        })),
      });

      toast.success("Watchlist updated successfully");

      closeModal();
    } catch {
      toast.error("Failed to update watchlist");
    }
  };

  if (!updateData?._id) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="st-label">Watchlist Name</label>

        <input
          name="watchlistName"
          value={updateData.watchlistName || ""}
          onChange={handleChange}
          className="st-input"
        />
      </div>

      <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-4">
        {updateData.stocks?.length === 0 ? (
          <p className="text-text-muted text-center">No stocks added</p>
        ) : (
          updateData.stocks?.map((stock, idx) => (
            <div key={stock._id} className="st-card p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">
                  Stock #{idx + 1}
                </span>

                <button
                  type="button"
                  className="text-red-400"
                  onClick={() => handleDeleteStock(stock._id)}
                >
                  ✕
                </button>
              </div>

              <input
                name="stockName"
                value={stock.stockName || ""}
                onChange={(e) => handleStockChange(e, idx)}
                className="st-input"
                placeholder="Stock Name"
              />

              <input
                name="stockSymbol"
                value={stock.stockSymbol || ""}
                onChange={(e) => handleStockChange(e, idx)}
                className="st-input"
                placeholder="Stock Symbol"
              />
            </div>
          ))
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" className="st-btn-green flex-1">
          Update
        </button>

        <button
          type="button"
          className="st-btn-ghost flex-1"
          onClick={() => {
            openModal("addStocks");
          }}
        >
          + Add Stocks
        </button>
      </div>
    </form>
  );
}
