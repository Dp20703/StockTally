import axios from "axios";
import { toast } from "react-toastify";

export const deleteTrade = (tradeId, navigate) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/trades/delete/${tradeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(() => {
        // console.log("Trade Deleted Successfully")
        toast.success("Trade Deleted Successfully", {
            position: "top-right",
            autoClose: 1000,
            onClose: () => {
                navigate('/trade/dashboard');
                // handleDeleteSuccess(tradeId)
            }
        })
    }).catch((err) => {
        // console.log("Error while deleting trade:", err);
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