import { toast } from "react-toastify";
import api from "../../Services/apiClient";

export const deleteTrade = (tradeId, navigate) => {

    api.delete(`/trades/delete/${tradeId}`)
        .then(() => {
            navigate('/trade/dashboard');
        }).catch((err) => {

            if (err.response.status === 404) {
                toast.error("Trade not found", {
                    position: "top-right",
                    autoClose: 1000,
                })
            }
            else if (err.response.status === 500) {
                toast.error(err.response.data.message || "Internal Server Error", {
                    position: "top-right",
                    autoClose: 1000,
                })
            }
            else {
                toast.error("Failed to delete a trade",
                    {
                        position: "top-right",
                        autoClose: 1500,
                    }
                )
            }
        })
}