import api from "services/apiClient";
import { toast } from "react-toastify";

export const deleteStock = (stockId, watchlistId) => {
  api
    .delete(`/watchlist/${watchlistId}/delete/stock/${stockId}`)
    .then(() => {
      toast.success("Stock deleted successfully");
    })
    .catch((err) => {
      toast.error("Failed to delete stock");
    });
};
