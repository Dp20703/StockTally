import { toast } from "react-toastify";
import api from "services/apiClient";

export const deleteTrade = async (tradeId) => {
  try {
    await api.delete(`/trades/delete/${tradeId}`);

    toast.success("Trade deleted successfully", {
      position: "top-right",
      autoClose: 1200,
    });

    return true;
  } catch (err) {
    if (err.response?.status === 404) {
      toast.error("Trade not found", {
        position: "top-right",
        autoClose: 1000,
      });
    } else if (err.response?.status === 500) {
      toast.error(err.response.data.message || "Internal Server Error", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.error("Failed to delete trade", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    return false;
  }
};
