import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProtectWrapper from "./middleware/UserProtectWrapper";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import NotFound from "./pages/NotFoundPage";
import Profile from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import Logout from "./pages/LogoutPage";
import Dashboard from "./pages/DashboardPage";
import ChartsPage from "./pages/ChartsPage";
import TopStories from "./pages/TopStoriesPage";
import Watchlist from "./pages/WatchlistPage";

const App = () => {
  return (
    <>
      <ToastContainer toastClassName={"custom-toast-container"} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/profile"
            element={
              <UserProtectWrapper>
                <Profile />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/logout"
            element={
              <UserProtectWrapper>
                <Logout />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/trade/dashboard"
            element={
              <UserProtectWrapper>
                <Dashboard />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/trade/watchlist"
            element={
              <UserProtectWrapper>
                <Watchlist />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/chart/showchart"
            element={
              <UserProtectWrapper>
                <ChartsPage />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/chart/topstories"
            element={
              <UserProtectWrapper>
                <TopStories />
              </UserProtectWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
