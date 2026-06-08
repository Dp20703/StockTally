import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "components/ui";
import useAuth from "../hooks/useAuth";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div>
        <BarLoader />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default UserProtectWrapper;
