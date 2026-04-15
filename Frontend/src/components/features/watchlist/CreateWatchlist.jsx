import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useWatchlists } from "../../../context/WatchlistContext";
import api from "services/apiClient";

export default function CreateWatchlist({ setModal }) {
  const navigate = useNavigate();
  const { fetchWatchlist } = useWatchlists();

  const [watchlist, setWatchlist] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = watchlist.trim();

    if (!trimmedName) {
      toast.warn("Watchlist name cannot be empty");
      return;
    }

    try {
      await api.post("/watchlist/create", {
        watchlistName: trimmedName,
      });

      fetchWatchlist?.();
      setWatchlist("");
      setModal(false);

      toast.success("Watchlist created successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      navigate("/trade/watchlist");
    } catch (err) {
      const status = err?.response?.status;

      const message =
        status === 409
          ? "Watchlist already exists"
          : "Failed to create watchlist";

      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-lg text-text-primary font-medium">
        Create Watchlist
      </h2>

      {/* Input */}
      <div>
        <label className="st-label">Watchlist Name</label>
        <input
          type="text"
          value={watchlist}
          onChange={(e) => setWatchlist(e.target.value)}
          placeholder="Enter watchlist name"
          className="st-input"
        />
      </div>

      {/* Button */}
      <button type="submit" className="st-btn-green w-full">
        Add Watchlist
      </button>
    </form>
  );
}
