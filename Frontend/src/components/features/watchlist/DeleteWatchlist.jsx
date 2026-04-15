import api from "services/apiClient";
import { toast } from "react-toastify";

export const deleteWatchlist = (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token");
  }
  api
    .delete(`/watchlist/delete/${id}`)
    .then(() => {
      toast.success("Watchlist deleted successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    })
    .catch((err) => {
      toast.error("Failed to delete watchlist", {
        position: "top-right",
        autoClose: 1000,
      });
    });
};
