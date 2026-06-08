import { useState } from "react";
import { toast } from "react-toastify";

import useModal from "../../../hooks/useModal";
import useWatchlist from "../../../hooks/useWatchlist";

export default function CreateWatchlistForm() {
  const [watchlist, setWatchlist] = useState("");

  const { closeModal } = useModal();

  const { createWatchlist } = useWatchlist();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = watchlist.trim();

    if (!trimmed) {
      toast.warn("Watchlist name cannot be empty");
      return;
    }

    try {
      await createWatchlist({ watchlistName: trimmed });

      toast.success("Watchlist created successfully");

      closeModal();
    } catch (err) {
      toast.error(
        err?.response?.status === 409
          ? "Watchlist already exists"
          : "Failed to create watchlist",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="st-label">Watchlist Name</label>

        <input
          value={watchlist}
          onChange={(e) => setWatchlist(e.target.value)}
          className="st-input"
          placeholder="Enter Watchlist name"
        />
      </div>

      <button type="submit" className="st-btn-green">
        Create Watchlist
      </button>
    </form>
  );
}
