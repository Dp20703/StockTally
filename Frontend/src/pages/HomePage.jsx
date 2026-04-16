import { Link } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="st-page flex items-center justify-center">
        <div className="st-card p-6 text-center animate-pulse">
          <p className="text-text-muted">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="st-page flex items-center justify-center">
      <div className="st-card p-8 flex flex-col items-center gap-6 text-center max-w-md w-full">
        {/* Title */}
        <h1 className="text-2xl text-text-primary font-semibold">StockTally</h1>

        {/* Logged in */}
        {user ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg text-text-primary">
              Welcome,
              <span className="ml-2 text-green-400 font-medium">
                {user?.fullName?.firstName} {user?.fullName?.lastName || "User"}
              </span>
            </h2>

            <Link to="/profile" className="st-btn-green w-full">
              Go to Profile →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <Link to="/login" className="st-btn-green w-full">
              Login
            </Link>

            <Link to="/signup" className="st-btn-ghost w-full">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
