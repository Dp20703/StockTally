import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const guestLinks = [
  { label: "Features", to: "/#features" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

const userLinks = [
  { label: "Dashboard", to: "/trade/dashboard" },
  { label: "Watchlist", to: "/trade/watchlist" },
  { label: "Charts", to: "/chart/showchart" },
  { label: "Top Stories", to: "/chart/topstories" },
  { label: "Blog", to: "/blog" },
];

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const links = user ? userLinks : guestLinks;

  return (
    <nav className="st-nav">
      <div className="st-nav-inner">
        {/* Logo */}
        <Link to="/" className="st-nav-brand">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          StockTally
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`st-nav-link ${isActive(to) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link to="/login" className="st-nav-link">
                Login
              </Link>
              <Link
                to="/signup"
                className="st-btn-green text-sm px-4 py-1.5 ml-2"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="st-nav-link">
                Profile
              </Link>
              <Link
                to="/logout"
                className="st-btn-red text-sm px-4 py-1.5 ml-2"
              >
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1 p-2"
        >
          <span
            className={`w-5 h-[2px] bg-text-muted transition ${
              open ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-text-muted transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-text-muted transition ${
              open ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-bg-border bg-bg-surface px-4 pb-4 pt-2 flex flex-col gap-2 animate-slide-down">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`st-nav-link ${isActive(to) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="st-nav-link"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="st-btn-green mt-2 text-center"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="st-nav-link"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                onClick={() => setOpen(false)}
                className="st-btn-red mt-2 text-center"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
