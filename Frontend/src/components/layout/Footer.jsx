import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-bg-border px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-text-primary font-semibold text-lg">
                StockTally
              </span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed">
              A free trade journal and portfolio tracker for Indian stock market
              traders.
            </p>
          </div>
          <div>
            <p className="text-text-primary text-xs font-medium uppercase tracking-wider mb-3">
              Product
            </p>
            <div className="flex flex-col gap-2">
              {[
                ["Dashboard", "/trade/dashboard"],
                ["Watchlist", "/trade/watchlist"],
                ["Charts", "/chart/showchart"],
                ["Top Stories", "/chart/topstories"],
              ].map(([l, h]) => (
                <Link
                  key={l}
                  to={h}
                  className="text-text-muted text-xs hover:text-green-400 transition-colors duration-fast"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-text-primary text-xs font-medium uppercase tracking-wider mb-3">
              Learn
            </p>
            <div className="flex flex-col gap-2">
              {[
                ["Blog", "/blog"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <Link
                  key={l}
                  to={h}
                  className="text-text-muted text-xs hover:text-green-400 transition-colors duration-fast"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-text-primary text-xs font-medium uppercase tracking-wider mb-3">
              Legal
            </p>
            <div className="flex flex-col gap-2">
              {[
                ["Privacy Policy", "/privacy"],
                ["Terms & Conditions", "/terms"],
                ["Disclaimer", "/disclaimer"],
              ].map(([l, h]) => (
                <Link
                  key={l}
                  to={h}
                  className="text-text-muted text-xs hover:text-green-400 transition-colors duration-fast"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="st-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © 2026 StockTally. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Built for Indian retail traders. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
