import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const toastId = "login-required";
        if (!token) {

            toast.error("Please login first", {
                toastId, // prevents duplicate toasts
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate("/login");
                }
            });
        }

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Authorizated user");
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error("User Protect Authorization error:", error);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    if (isLoading) {
        return <>Loading...</>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
