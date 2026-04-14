import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import { useAuth } from "../context/AuthContext";

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
      return toast.error("Please fill all fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await api.post("/users/register", data);

      setUser(res?.data?.user);

      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="st-page flex items-center justify-center">
      <div className="st-card p-8 w-full max-w-md flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-xl text-text-primary text-center">
          Create Account
        </h1>

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
              />
            </div>

            <div>
              <label className="st-label">Last Name</label>
              <input
                name="lastName"
                value={data.fullName.lastName}
                onChange={handleChange}
                className="st-input"
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
