import { useEffect } from "react";
import WatchListCard from "./WatchListCard";
import useWatchlists from "../../../hooks/useWatchlists";

export default function AllWatchlist({
  setUpdateModal,
  setWatchlistId,
  setModal,
}) {
  const { watchlists, fetchWatchlist } = useWatchlists();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-md text-text-primary px-1">Your Watchlists</h2>

      {/* Empty state */}
      {watchlists.length === 0 ? (
        <div className="st-card p-8 text-center">
          <p className="text-text-muted mb-2">No watchlists yet</p>
          <button className="st-btn-green" onClick={() => setModal(true)}>
            + Create your first watchlist
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {watchlists?.map((watchlist, idx) => (
            <WatchListCard
              key={watchlist._id}
              watchlist={watchlist}
              idx={idx}
              setUpdateModal={setUpdateModal}
              setWatchlistId={setWatchlistId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
