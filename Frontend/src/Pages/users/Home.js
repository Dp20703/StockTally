import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-white">Loading...</div>;
    // console.log("user: ", user);

    return (
        <div
            id="home"
            className="d-flex flex-column justify-content-center  align-items-center "
        >
            <div id="home-text" className="text-center">
                {user ? (
                    <div id="wel-msg" className="mt-3">
                        <h4 className="mb-3 text-white ">
                            Welcome,{" "}
                            <span className=" rounded-5 fw-bold">
                                {user?.fullName?.firstName + " " + user?.fullName?.lastName || "User"}
                            </span>
                        </h4>
                        <Link
                            to="/profile"
                            className=" fw-bolder btn btn-light rounded-5 text-white"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.textDecoration = "underline")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.textDecoration = "none")
                            }
                        >
                            Go to Profile →
                        </Link>
                    </div>
                ) : (
                    <div id="home-btns">
                        <Link
                            to="/login"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.textDecoration = "underline")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.textDecoration = "none")
                            }
                            className="btn btn-black fw-bolder bg-white rounded-5 py-2 px-5"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.textDecoration = "underline")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.textDecoration = "none")
                            }
                            className="btn btn-black bg-white fw-bolder rounded-5 py-2 px-5"
                        >
                            SignUp
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
