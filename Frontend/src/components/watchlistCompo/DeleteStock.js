import axios from "axios";
import { toast } from "react-toastify";

export const deleteStock = (stockId, watchlistId) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/watchlist/${watchlistId}/delete/stock/${stockId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(() => {
        toast.success("Stock deleted successfully", {
            position: "top-right",
            autoClose: 1000,
        })
    })
        .catch((err) => {
            // console.log("err:", err)
            toast.error("Failed to delete stock", {
                position: "top-right",
                autoClose: 1000
            })
        })
}