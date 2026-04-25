import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/trade/dashboard" },
  { label: "Watchlist", to: "/trade/watchlist" },
  { label: "Charts", to: "/chart/showchart" },
  { label: "Top Stories", to: "/chart/topstories" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Profile", to: "/profile" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <style>{`
                .nav-link {
                    font-size: 13px;
                    font-weight: 400;
                    color: #94a3b8;
                    text-decoration: none;
                    padding: 6px 10px;
                    border-radius: 6px;
                    transition: color 0.15s, background 0.15s;
                    white-space: nowrap;
                }
                .nav-link:hover { color: #f0fdf4; background: #1a2235; }
                .nav-link.active { color: #4ade80; }
                .nav-logout {
                    font-size: 13px;
                    font-weight: 500;
                    color: #f87171;
                    text-decoration: none;
                    padding: 6px 14px;
                    border-radius: 6px;
                    border: 1px solid #7f1d1d;
                    transition: opacity 0.15s;
                    white-space: nowrap;
                }
                .nav-logout:hover { opacity: 0.75; }
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    cursor: pointer;
                    padding: 6px;
                    background: none;
                    border: none;
                }
                .hamburger span {
                    display: block;
                    width: 22px;
                    height: 2px;
                    background: #94a3b8;
                    border-radius: 2px;
                    transition: transform 0.2s, opacity 0.2s;
                }
                .nav-links-desktop {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .nav-links-mobile {
                    display: none;
                }
                @media (max-width: 768px) {
                    .hamburger { display: flex; }
                    .nav-links-desktop { display: none; }
                    .nav-links-mobile {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        padding: 12px 16px 16px;
                        border-top: 1px solid #1e2d3d;
                    }
                    .nav-links-mobile .nav-link,
                    .nav-links-mobile .nav-logout {
                        display: block;
                        padding: 10px 14px;
                        font-size: 14px;
                    }
                }
            `}</style>

      <div style={styles.inner}>
        <Link to="/" style={styles.brand}>
          <span style={styles.brandDot} />
          StockTally
        </Link>

        <div className="nav-links-desktop">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/logout" className="nav-logout" style={{ marginLeft: 8 }}>
            Logout
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span
            style={
              open ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}
            }
          />
          <span style={open ? { opacity: 0 } : {}} />
          <span
            style={
              open ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}
            }
          />
        </button>
      </div>

      {open && (
        <div className="nav-links-mobile">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${isActive(to) ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/logout"
            className="nav-logout"
            onClick={() => setOpen(false)}
            style={{ marginTop: 8, textAlign: "center" }}
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#0d1117",
    borderBottom: "1px solid #1e2d3d",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: 56,
    maxWidth: 1280,
    margin: "0 auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    fontWeight: 500,
    color: "#f0fdf4",
    textDecoration: "none",
    letterSpacing: "-0.01em",
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },
};

export default Navbar;
