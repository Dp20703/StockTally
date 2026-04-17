import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-bg-border px-4 py-6 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-text-primary font-medium text-lg">
            StockTally
          </span>
        </div>

        {/* Text */}
        <p className="text-text-muted text-xs text-center">
          Built with the MERN stack. Designed for traders.
        </p>

        {/* Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/"
            className="text-text-muted text-xs hover:text-text-primary transition-colors duration-fast"
          >
            Home
          </Link>
          <Link
            to="/trade/dashboard"
            className="text-text-muted text-xs hover:text-text-primary transition-colors duration-fast"
          >
            Dashboard
          </Link>
          <Link
            to="/trade/watchlist"
            className="text-text-muted text-xs hover:text-text-primary transition-colors duration-fast"
          >
            Watchlist
          </Link>
          <Link
            to="/profile"
            className="text-text-muted text-xs hover:text-text-primary transition-colors duration-fast"
          >
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
