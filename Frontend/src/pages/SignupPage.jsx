import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import api from "services/apiClient";
import { useAuth } from "context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    userName: "",
    fullName: { firstName: "", lastName: "" },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName"].includes(name)) {
      setData((prev) => ({
        ...prev,
        fullName: { ...prev.fullName, [name]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { userName, fullName, email, password } = data;

    if (!userName || !fullName.firstName || !email || !password) {
      return toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    try {
      setLoading(true);

      const res = await api.post("/users/register", data);

      localStorage.setItem("token", res?.data?.token);
      setUser(res?.data?.user);

      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Signup failed", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Google Signup/Login
  const handleGoogleSignup = async () => {
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
      toast.error("Google signup failed", {
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
            Create Account
          </h1>
          <p className="text-text-muted text-center text-sm">
            Start managing your trades
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="st-label">Username</label>
            <input
              name="userName"
              value={data.userName}
              onChange={handleChange}
              className="st-input"
              placeholder="Enter username"
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="st-label">First Name</label>
              <input
                name="firstName"
                value={data.fullName.firstName}
                onChange={handleChange}
                className="st-input"
                placeholder="Enter firstname"
              />
            </div>

            <div>
              <label className="st-label">Last Name</label>
              <input
                name="lastName"
                value={data.fullName.lastName}
                onChange={handleChange}
                className="st-input"
                placeholder="Enter lastname"
              />
            </div>
          </div>

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
            {loading ? "Registering..." : "Register"}
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
          onClick={handleGoogleSignup}
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
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login →
          </Link>
        </p>
      </div>
    </main>
  );
}
