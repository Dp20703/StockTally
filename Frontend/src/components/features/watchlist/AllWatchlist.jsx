import { useEffect } from "react";
import WatchListCard from "./WatchListCard";
import useWatchlist from "../../../hooks/useWatchlist";
import useModal from "../../../hooks/useModal";

export default function AllWatchlist() {
  const { watchlists, fetchWatchlists } = useWatchlist();

  const { openModal } = useModal();

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-md text-text-primary px-1">Your Watchlists</h2>

      {watchlists.length === 0 ? (
        <div className="st-card p-8 text-center">
          <p className="text-text-muted mb-2">No watchlists yet</p>

          <button
            className="st-btn-green"
            onClick={() => openModal("createWatchlist")}
          >
            + Create your first watchlist
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {watchlists.map((watchlist, idx) => (
            <WatchListCard
              key={watchlist._id}
              watchlist={watchlist}
              idx={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
