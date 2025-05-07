import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // Include this if your backend also uses session/cookies
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("User profile fetched successfully.");
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error("Authorization error:", error);
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
