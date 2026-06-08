import { toast } from "react-toastify";

import StockCard from "../stock/StockCard";
import useModal from "../../../hooks/useModal";
import useWatchlist from "../../../hooks/useWatchlist";

export default function WatchListCard({ watchlist, idx }) {
  const { openModal } = useModal();

  const { setWatchlistId, removeWatchlist } = useWatchlist();

  const handleDelete = async () => {
    try {
      await removeWatchlist(watchlist._id);

      toast.success("Watchlist deleted");
    } catch {
      toast.error("Failed to delete watchlist");
    }
  };

  return (
    <div className="st-card p-4 hover:shadow-lg transition w-full md:w-[420px] flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <h2>
            {idx + 1}. {watchlist.watchlistName}
          </h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              openModal("updateWatchlist");
              setWatchlistId(watchlist._id);
            }}
          >
            <i className="ri-edit-line" />
          </button>

          <button onClick={handleDelete}>
            <i className="ri-delete-bin-line" />
          </button>
        </div>
      </div>
      {/* Stocks */}
      <div className="flex flex-col gap-2">
        {watchlist.stocks?.length > 0 ? (
          watchlist.stocks.map((stock) => (
            <StockCard key={stock._id} stock={stock} />
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
