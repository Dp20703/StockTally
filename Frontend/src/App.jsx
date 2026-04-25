import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AnalyticsTracker from "utils/AnalyticsTracker";
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
import PrivacyPolicy from "pages/PrivacyPolicyPage";
import Terms from "pages/TermsAndConditionsPage";
import Disclaimer from "pages/DisclaimerPage";
import Contact from "pages/ContactPage";
import BlogPage from "pages/BlogPage";
import BlogArticlePage from "pages/BlogArticlePage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AnalyticsTracker />
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

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
