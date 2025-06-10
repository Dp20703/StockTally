import axios from "axios";
import { toast } from "react-toastify";

export const deleteWatchlist = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token");
    }
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/watchlist/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(() => {
            toast.success("Watchlist deleted successfully", {
                position: "top-right",
                autoClose: 1000,
            })
        })
        .catch(err => {
            // console.log(err);
            toast.error("Failed to delete watchlist", {
                position: "top-right",
                autoClose: 1000
            })
        })
}