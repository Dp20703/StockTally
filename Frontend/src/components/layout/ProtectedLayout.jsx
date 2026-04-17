import UserProtectWrapper from "middleware/UserProtectWrapper";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <UserProtectWrapper>
      <div className="min-h-screen flex flex-col bg-bg-base">
        <Navbar />

        <main className="flex-1 transition-opacity duration-normal ease-in opacity-100">
          <Outlet />
        </main>

        <Footer />
      </div>
    </UserProtectWrapper>
  );
};

export default ProtectedLayout;
