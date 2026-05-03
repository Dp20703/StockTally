import UserProtectWrapper from "middleware/UserProtectWrapper";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <UserProtectWrapper>
      <Outlet />
    </UserProtectWrapper>
  );
};

export default ProtectedLayout;
