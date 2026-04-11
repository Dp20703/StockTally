import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Services/apiClient";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        userName: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
        email: "",
        password: "",
    });

    // Handle input change
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

    // Form submit
    const submitHandler = async (e) => {
        e.preventDefault();

        const { userName, fullName, email, password } = data;

        // Validation
        if (!userName || !fullName.firstName || !email || !password) {
            return toast.error("Please fill in all required fields.");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters.");
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return toast.error("Invalid email format.");
        }

        setLoading(true);

        try {
            const res = await api.post("/users/register", data);

            setUser(res?.data?.user);

            toast.success("Registration successful!", {
                autoClose: 1000,
                onClose: () => navigate("/login"),
            });

        } catch (error) {
            const { status, data } = error?.response || {};

            if (status === 400 && data?.errors) {
                data.errors.forEach((err) => toast.error(err.message));
            } else if (status === 409) {
                toast.error("Email already exists.");
            } else if (status === 410) {
                toast.error("Username already exists.");
            } else {
                toast.error(data?.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login">
            <section className="registerWrapper">

                {/* FORM SECTION */}
                <section className="registerForm">
                    <header>
                        <h1 className="text-center fw-bold fs-1 mb-4">
                            Create Account
                        </h1>
                    </header>

                    <form onSubmit={submitHandler} noValidate>
                        <fieldset>

                            {/* Username */}
                            <div className="mb-4">
                                <label htmlFor="userName" className="form-label fw-bold">
                                    Username
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    name="userName"
                                    value={data.userName}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    className="form-control rounded-5 py-3"
                                    required
                                />
                            </div>

                            {/* Full Name */}
                            <div className="d-flex gap-2 mb-4">
                                <div className="w-50">
                                    <label htmlFor="firstName" className="form-label fw-bold">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={data.fullName.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                        className="form-control rounded-5 py-3"
                                        required
                                    />
                                </div>

                                <div className="w-50">
                                    <label htmlFor="lastName" className="form-label fw-bold">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={data.fullName.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                        className="form-control rounded-5 py-3"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-bold">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="xyz@gmail.com"
                                    className="form-control rounded-5 py-3"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-bold">
                                    Password
                                </label>

                                <div className=" position-relative">

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="form-control rounded-5 py-3 mb-3 pe-5"
                                        required
                                    />

                                    <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent fs-5"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="form-control rounded-5 py-3 btn btn-dark fs-5"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>

                        </fieldset>
                    </form>

                    {/* Login Link */}
                    <footer className="text-center mt-3">
                        <p>
                            Already have an account?{" "}
                            <Link className="fw-bold text-dark" to="/login">
                                Login →
                            </Link>
                        </p>
                    </footer>
                </section>

                {/* IMAGE */}
                <aside className="poster">
                    <img src="../images/login_poster.png" alt="Signup illustration" />
                </aside>

            </section>
        </main>
    );
};

export default Signup;