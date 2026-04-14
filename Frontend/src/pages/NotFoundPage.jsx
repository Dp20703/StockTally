import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="st-page flex items-center justify-center">

      <div className="st-card p-10 flex flex-col items-center gap-6 text-center max-w-md">

        {/* 404 */}
        <h1 className="text-5xl font-bold text-red-400">
          404
        </h1>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-text-primary">
            Page not found
          </h2>

          <p className="text-text-muted text-sm">
            Looks like you're lost. The page you’re looking for doesn’t exist.
          </p>
        </div>

        {/* Button */}
        <Link to="/" className="st-btn-green">
          Go to Home →
        </Link>

      </div>

    </main>
  );
}