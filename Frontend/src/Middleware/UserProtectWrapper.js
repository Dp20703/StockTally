import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();

    console.log("auth:", auth, "loading:", loading);
    useEffect(() => {
        if (!loading && auth === false) {
            toast.error("Please login first", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate("/login");
                }
            });
        }
    }, [auth, loading, navigate]);

    if (loading || auth === null) {
        return <div className="text-center mt-2">Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
