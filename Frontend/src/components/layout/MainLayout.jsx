import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ModalManager from "../features/modal/ModalManager";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Navbar />

      <main className="flex-1 transition-opacity duration-normal ease-in opacity-100">
        <Outlet />
        <ModalManager />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
