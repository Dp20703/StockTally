import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AnalyticsTracker from "utils/AnalyticsTracker";

/* Pages */
import Home from "pages/HomePage";
import Signup from "pages/SignupPage";
import Login from "pages/LoginPage";
import NotFound from "pages/NotFoundPage";
import AboutPage from "pages/AboutPage";
import PrivacyPolicy from "pages/PrivacyPolicyPage";
import Terms from "pages/TermsAndConditionsPage";
import Disclaimer from "pages/DisclaimerPage";
import Contact from "pages/ContactPage";
import BlogPage from "pages/BlogPage";
import BlogArticlePage from "pages/BlogArticlePage";

/* Protected Pages */
import Profile from "pages/ProfilePage";
import Logout from "pages/LogoutPage";
import Dashboard from "pages/DashboardPage";
import ChartsPage from "pages/ChartsPage";
import TopStories from "pages/TopStoriesPage";
import Watchlist from "pages/WatchlistPage";

/* Layouts */
import MainLayout from "components/layout/MainLayout";
import ProtectedLayout from "components/layout/ProtectedLayout";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <BrowserRouter>
        <AnalyticsTracker />

        <Routes>
          {/* ── PUBLIC ROUTES WITH LAYOUT ── */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
          </Route>

          {/* ── AUTH PAGES ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ── PROTECTED ROUTES ── */}
          <Route element={<ProtectedLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/trade/dashboard" element={<Dashboard />} />
              <Route path="/trade/watchlist" element={<Watchlist />} />
              <Route path="/chart/showchart" element={<ChartsPage />} />
              <Route path="/chart/topstories" element={<TopStories />} />
            </Route>
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
