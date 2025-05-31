import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUser } = useAuth();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                setUser(response.data);
                console.log("Authenticated user.");
            }
        }).catch((err) => {
            console.log(err.response.data.message || "Error while getting user:", err);
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, []);



    if (loading) {
        return <div className="text-center mt-2">Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
