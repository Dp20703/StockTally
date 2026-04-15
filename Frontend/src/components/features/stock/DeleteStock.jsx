import api from "services/apiClient";
import { toast } from "react-toastify";

export const deleteStock = (stockId, watchlistId) => {
  api
    .delete(`/watchlist/${watchlistId}/delete/stock/${stockId}`)
    .then(() => {
      toast.success("Stock deleted successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    })
    .catch((err) => {
      toast.error("Failed to delete stock", {
        position: "top-right",
        autoClose: 1000,
      });
    });
};
