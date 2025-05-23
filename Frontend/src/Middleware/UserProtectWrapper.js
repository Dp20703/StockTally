import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { auth, loading } = useAuth();
    console.log("from auth :", auth, loading);
    const [verify, setVerify] = useState(false);


    useEffect(() => {
        if (!loading)
            if (!auth) {
                toast.error("Please login first", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        navigate("/login");
                    }
                });
            }
            else {
                setVerify(true);
            }
    }, [auth, loading, navigate]);

    if (loading || !verify) {
        return <>Loading...</>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
