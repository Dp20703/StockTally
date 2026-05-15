import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddStock from "../stock/AddStock";
import { deleteStock } from "../stock/DeleteStock";
import { useWatchlists } from "../../../context/WatchlistContext";
import api from "services/apiClient";

export default function UpdateWatchlist({ setUpdateModal, watchlistId }) {
  const [updateWatchlist, setUpdateWatchlist] = useState({});
  const [addStockModal, setAddStockModal] = useState(false);
  const { fetchWatchlist } = useWatchlists();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateWatchlist((prev) => ({ ...prev, [name]: value }));
  };

  const handleStockChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStocks = [...updateWatchlist.stocks];
    updatedStocks[index] = { ...updatedStocks[index], [name]: value };
    setUpdateWatchlist((prev) => ({ ...prev, stocks: updatedStocks }));
  };

  useEffect(() => {
    api
      .get(`/watchlist/get/${watchlistId}`)
      .then((res) => setUpdateWatchlist(res.data))
      .catch(() =>
        toast.error("Failed to fetch watchlist", {
          position: "top-right",
          autoClose: 1000,
        }),
      );
  }, [watchlistId]);

  const handleDeleteStock = (stockId) => {
    deleteStock(stockId, watchlistId);
    fetchWatchlist();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/watchlist/update/${watchlistId}`, {
        watchlistName: updateWatchlist.watchlistName,
        stocks: updateWatchlist.stocks.map((stock) => ({
          stockName: stock.stockName,
          stockSymbol: stock.stockSymbol,
          stockId: stock._id,
        })),
      });

      toast.success("Watchlist updated successfully", {
        position: "top-right",
        autoClose: 1000,
      });
      setUpdateModal(false);
      fetchWatchlist();
    } catch {
      toast.error("Failed to update watchlist", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-lg text-text-primary">Update Watchlist</h2>

        {/* Name */}
        <div>
          <label className="st-label">Watchlist Name</label>
          <input
            name="watchlistName"
            value={updateWatchlist.watchlistName || ""}
            onChange={handleChange}
            className="st-input"
          />
        </div>

        {/* Stocks */}
        <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-4">
          {updateWatchlist.stocks?.length === 0 ? (
            <p className="text-text-muted text-center">No stocks added</p>
          ) : (
            updateWatchlist.stocks?.map((stock, idx) => (
              <div key={idx} className="st-card p-3 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">
                    Stock #{idx + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteStock(stock._id)}
                    className="text-red-400"
                  >
                    ✕
                  </button>
                </div>

                <input
                  name="stockName"
                  value={stock.stockName || ""}
                  onChange={(e) => handleStockChange(e, idx)}
                  className="st-input"
                  placeholder="Stock name"
                />

                <input
                  name="stockSymbol"
                  value={stock.stockSymbol || ""}
                  onChange={(e) => handleStockChange(e, idx)}
                  className="st-input"
                  placeholder="Stock symbol"
                />
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="submit" className="st-btn-green flex-1">
            Update
          </button>

          <button
            type="button"
            className="st-btn-ghost flex-1"
            onClick={() => setAddStockModal(true)}
          >
            + Add Stocks
          </button>
        </div>
      </form>

      {addStockModal && (
        <AddStock
          watchlistId={watchlistId}
          setAddStockModal={setAddStockModal}
          setUpdateModal={setUpdateModal}
        />
      )}
    </>
  );
}
