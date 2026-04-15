import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "services/apiClient";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await api.get("/users/logout");
        toast.success("User Logged out Successfully", {
          position: "top-right",
          autoClose: 1000,
        });
      } catch (error) {
        console.log("Logout error:", error); // just log
      } finally {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });
      }
    };

    logoutUser();
  });

  return <div className="text-center mt-5">Logout....</div>;
};

export default Logout;
