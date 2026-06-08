import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";

export default function useWatchlists() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlists must be used within WatchlistProvider");
  }

  return context;
}
