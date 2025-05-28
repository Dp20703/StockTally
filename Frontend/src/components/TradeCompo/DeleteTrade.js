import axios from "axios";
import { toast } from "react-toastify";

export const deleteTrade = (tradeId,navigate) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/trades/delete/${tradeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(() => {
        console.log("Trade Deleted Successfully")
        toast.success("Trade Deleted Successfully", {
            position: "top-right",
            autoClose: 1000,
            onClose: () => {
                navigate('/trade/dashboard');
                // handleDeleteSuccess(tradeId)
            }
        })
    }).catch((err) => {
        console.log("Error while deleting trade:", err);
        toast.error("Failed to delete a trade",
            {
                position: "top-right",
                autoClose: 1500,
            }
        )
    })
}