import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
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
                console.log("User profile got successfully in authContext:", response.data);
            }
        }).catch((err) => {
            console.log("Error while getting user profile:", err);
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
