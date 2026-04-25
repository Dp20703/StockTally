import { Divider } from "components/ui";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-bg-border px-4 py-8 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span className="text-text-primary font-medium text-lg">
              StockTally
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-xs">
            <Link
              to="/"
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              Home
            </Link>
            <Link
              to="/trade/dashboard"
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              Dashboard
            </Link>
            <Link
              to="/trade/watchlist"
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              Watchlist
            </Link>
            <Link
              to="/blog"
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              Blog
            </Link>
            <Link
              to="/profile"
              className="text-text-muted hover:text-text-primary transition-colors duration-fast"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Middle Divider */}
        <Divider />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Copyright */}
          <p className="text-text-muted text-center sm:text-left">
            © 2025 StockTally. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <Link
              to="/privacy"
              className="text-text-muted hover:text-green-400 transition-colors duration-fast"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-text-muted hover:text-green-400 transition-colors duration-fast"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/disclaimer"
              className="text-text-muted hover:text-green-400 transition-colors duration-fast"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
