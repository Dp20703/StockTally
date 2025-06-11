import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../Utils/Loader";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div className="text-center mt-2"><Loader type="puff" size={50} /></div>;
    }
    return <>{children}</>;
};

export default UserProtectWrapper;
