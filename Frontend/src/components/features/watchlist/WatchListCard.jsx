import useWatchlists from "../../../hooks/useWatchlists";
import { deleteWatchlist } from "./DeleteWatchlist";

export default function WatchListCard({
  setUpdateModal,
  setWatchlistId,
  idx,
  watchlist,
}) {
  const { fetchWatchlist } = useWatchlists();

  const handleDelete = async (id) => {
    deleteWatchlist(id);
    fetchWatchlist();
  };

  return (
    <div className="st-card p-4 hover:shadow-lg transition w-full md:w-[420px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-text-muted text-sm">{idx + 1}.</span>

          <h2 className="text-text-primary font-medium">
            {watchlist.watchlistName}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex gap-3 text-text-muted">
          <button
            onClick={() => {
              setUpdateModal(true);
              setWatchlistId(watchlist._id);
            }}
            className="hover:text-blue-400"
          >
            <i className="ri-edit-line" />
          </button>

          <button
            onClick={() => handleDelete(watchlist._id)}
            className="hover:text-red-400"
          >
            <i className="ri-delete-bin-line" />
          </button>
        </div>
      </div>

      {/* Stocks */}
      <div className="flex flex-col gap-2">
        {watchlist.stocks && watchlist.stocks.length > 0 ? (
          watchlist.stocks.map((stock, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-bg-raised px-3 py-2 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="text-text-primary text-sm">
                  {stock.stockName}
                </span>
                <span className="text-text-muted text-xs">
                  {stock.stockSymbol}
                </span>
              </div>

              <span className="text-green-400 text-sm">
                {stock?.currentPrice ? (
                  <span className="st-mono text-text-primary">
                    ₹ {stock?.currentPrice}
                  </span>
                ) : (
                  <span className="text-xs text-text-muted">N/A</span>
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-text-muted text-sm py-4">
            No stocks
          </div>
        )}
      </div>
    </div>
  );
}
