import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "pages/HomePage";
import Signup from "pages/SignupPage";
import NotFound from "pages/NotFoundPage";
import Profile from "pages/ProfilePage";
import Login from "pages/LoginPage";
import Logout from "pages/LogoutPage";
import Dashboard from "pages/DashboardPage";
import ChartsPage from "pages/ChartsPage";
import TopStories from "pages/TopStoriesPage";
import Watchlist from "pages/WatchlistPage";
import AboutPage from "pages/AboutPage";
import ProtectedLayout from "components/layout/ProtectedLayout";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/trade/dashboard" element={<Dashboard />} />
            <Route path="/trade/watchlist" element={<Watchlist />} />
            <Route path="/chart/showchart" element={<ChartsPage />} />
            <Route path="/chart/topstories" element={<TopStories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
