import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import api from "services/apiClient";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    setLoading(true);

    try {
      const res = await api.post("/users/login", data);

      localStorage.setItem("token", res?.data?.token);
      setUser(res?.data?.user);

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await api.post("/users/auth/google", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      localStorage.setItem("token", res?.data?.token);
      setUser(res?.data?.user);

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => navigate("/profile"),
      });
    } catch (error) {
      console.log(error);
      toast.error("Google login failed", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="st-page flex items-center justify-center">
      <div className="st-card p-8 w-full max-w-md flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-text-primary text-center">
            Welcome back
          </h1>
          <p className="text-text-muted text-center text-sm">
            Login to manage your trades
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="st-label">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="st-input"
              placeholder="xyz@gmail.com"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="st-label">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="st-input pr-10"
                placeholder="Enter password"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="st-btn-green w-full"
            disabled={loading}
          >
            {loading ? "Signing..." : "Sign In"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2.5 px-4 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          <span className="text-sm font-medium text-gray-700">
            {loading ? "Please wait..." : "Continue with Google"}
          </span>
        </button>

        {/* Footer */}
        <p className="text-center text-text-muted text-sm">
          New to StockTally?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Create account →
          </Link>
        </p>
      </div>
    </main>
  );
}
