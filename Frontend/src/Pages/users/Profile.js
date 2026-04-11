import { useAuth } from "../../context/AuthContext";
import NavbarCompo from "../../components/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../Services/apiClient";

const Profile = () => {
    const { user, setUser } = useAuth();

    const [updateModal, setUpdateModal] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        profilePic: "",
        userName: "",
        fullName: { firstName: "", lastName: "" },
        email: "",
    });

    // Sync user data
    useEffect(() => {
        if (!user) return;

        setData({
            profilePic: user.profilePic || "",
            userName: user.userName || "",
            fullName: {
                firstName: user.fullName?.firstName || "",
                lastName: user.fullName?.lastName || "",
            },
            email: user.email || "",
        });

        setPreviewImage(user.profilePic || "");
    }, [user]);

    const handleToggle = () => setUpdateModal((prev) => !prev);

    const handleChange = ({ target: { name, value } }) => {
        if (["firstName", "lastName"].includes(name)) {
            setData((prev) => ({
                ...prev,
                fullName: { ...prev.fullName, [name]: value },
            }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleProfilePicChange = ({ target }) => {
        const file = target.files[0];
        if (!file) return;

        setData((prev) => ({ ...prev, profilePic: file }));

        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleDeletePic = async () => {
        try {
            const res = await api.delete("/users/delete_profile_pic");

            setUser(res?.data?.user);
            setPreviewImage("");

            toast.success(res?.data?.message);
        } catch {
            toast.error("Failed to delete profile picture");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userName", data.userName.trim());
        formData.append("email", data.email.trim());
        formData.append("profilePic", data.profilePic);
        formData.append("fullName[firstName]", data.fullName.firstName);
        formData.append("fullName[lastName]", data.fullName.lastName);

        setLoading(true);

        try {
            const res = await api.put("/users/update_profile", formData);

            setUser(res?.data?.user);
            setUpdateModal(false);

            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const profileImage =
        previewImage ||
        user?.profilePic ||
        `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 100
        )}.jpg`;

    return (
        <main id="dashboard">
            <NavbarCompo />

            <section className="profile mt-5 card m-auto bg-black text-white border border-gray border-1 rounded-5 overflow-hidden">

                {/* PROFILE IMAGE SECTION */}
                <header className="d-flex justify-content-center align-items-center">
                    <div className="position-relative text-center mt-3" style={{ width: "20rem" }}>

                        <figure className="dropdown d-inline-block">
                            <button
                                className="border-0 bg-transparent p-0 dropdown-toggle"
                                type="button"
                                id="profilePicDropdownBtn"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={profileImage}
                                    alt="User profile"
                                    className="rounded-circle"
                                    style={{
                                        height: "20rem",
                                        width: "20rem",
                                        objectFit: "cover",
                                        border: "2px solid white",
                                        cursor: "pointer",
                                    }}
                                />
                            </button>

                            <ul
                                className="dropdown-menu text-center"
                                aria-labelledby="profilePicDropdownBtn"
                                style={{ minWidth: "10rem" }}
                            >
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href={profileImage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        👁 View Profile Picture
                                    </a>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="dropdown-item text-danger"
                                        onClick={handleDeletePic}
                                    >
                                        ❌ Delete Profile Picture
                                    </button>
                                </li>
                            </ul>
                        </figure>

                        {/* Edit Button */}
                        <button
                            type="button"
                            className="border-0 bg-transparent editBtn"
                            onClick={handleToggle}
                            aria-label="Edit profile"
                        >
                            <i className="ri-file-edit-fill" />
                        </button>
                    </div>
                </header>

                {/* PROFILE CONTENT */}
                <article className="card-body text-center">
                    {updateModal ? (
                        <section id="updateProfile">
                            <form onSubmit={submitHandler} noValidate>

                                <header>
                                    <span className="close text-light" onClick={() => setUpdateModal(false)}>&times;</span>
                                    <h1 id="updateTitle" className="text-primary fw-bold mb-3">
                                        Update Profile
                                    </h1>
                                </header>

                                <fieldset>

                                    {/* First Name */}
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <label htmlFor="firstName" className="form-label mx-1 w-50">
                                            First name:
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            value={data.fullName.firstName}
                                            onChange={handleChange}
                                            className="form-control w-50"
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                                        <label htmlFor="lastName" className="form-label mx-1 w-50">
                                            Last name:
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            value={data.fullName.lastName}
                                            onChange={handleChange}
                                            className="form-control w-50"
                                            placeholder="Enter last name"
                                        />
                                    </div>

                                    {/* Username */}
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <label htmlFor="userName" className="form-label mx-1 w-50">
                                            Username:
                                        </label>
                                        <input
                                            id="userName"
                                            type="text"
                                            name="userName"
                                            value={data.userName}
                                            onChange={handleChange}
                                            className="form-control w-50"
                                            placeholder="Enter username"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <label htmlFor="email" className="form-label mx-1 w-50">
                                            Email:
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="form-control w-50"
                                            placeholder="Enter email"
                                        />
                                    </div>

                                    {/* Profile Pic */}
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <label htmlFor="profilePic" className="form-label mx-2 w-50">
                                            Choose profile picture:
                                        </label>
                                        <input
                                            id="profilePic"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePicChange}
                                            className="form-control w-50"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="form-control btn btn-danger mb-2"
                                    >
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                </fieldset>
                            </form>
                        </section>
                    ) : (
                        <section aria-label="User profile details">
                            <p className="card-title">
                                <i className="ri-shield-user-fill fs-4" />
                                &nbsp;
                                <span className="fs-4">{user?.userName}</span>
                            </p>

                            <p className="card-title">
                                <i className="ri-user-fill fs-5" />
                                &nbsp;
                                <span className="fs-6">
                                    {user?.fullName?.firstName} {user?.fullName?.lastName}
                                </span>
                            </p>

                            <p className="card-title">
                                <i className="ri-mail-fill fs-5" />
                                &nbsp;
                                <span className="fs-6">{user?.email}</span>
                            </p>
                        </section>
                    )}
                </article>
            </section>
        </main>
    );
};

export default Profile;