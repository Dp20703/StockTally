import { useAuth } from '../../context/AuthContext';
import NavbarCompo from '../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [updateModal, setUpdateModal] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [data, setData] = useState({
        profilePic: "",
        userName: "",
        fullName: {
            firstName: '',
            lastName: '',
        },
        email: '',
    });

    useEffect(() => {
        setData({
            profilePic: user?.profilePic || "",
            userName: user?.userName || "",
            fullName: {
                firstName: user?.fullName?.firstName || '',
                lastName: user?.fullName?.lastName || '',
            },
            email: user?.email || '',
        });
        setPreviewImage(user?.profilePic || "");
    }, [user]);

    const handleToggle = () => {
        setUpdateModal(!updateModal);
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prev) => ({ ...prev, profilePic: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePic = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/delete_profile_pic`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("res:", res);
            toast.success(res.data.message,{
                position: "top-right",
                autoClose: 1000
            });
            setUser(res.data.user); // Update frontend state
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete profile picture");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstName' || name === 'lastName') {
            setData((prev) => ({
                ...prev,
                fullName: { ...prev.fullName, [name]: value }
            }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('profilePic', data.profilePic); // Only works if file
        formData.append('fullName[firstName]', data.fullName.firstName);
        formData.append('fullName[lastName]', data.fullName.lastName);

        try {
            const res = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/users/update_profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('res:', res);

            setUser(res.data.user);
            toast.success('Profile updated successfully', {
                position: "top-right",
                autoClose: 1000,
            });
            setUpdateModal(false);
        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message || 'Something went wrong';
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
            });
        }
    };

    return (
        <div id='dashboard'>
            <NavbarCompo />

            <div className="profile mt-5 card m-auto bg-black text-white border border-gray border-1 rounded-5 overflow-hidden">

                <div className='d-flex justify-content-center align-items-center'>

                    <div className="position-relative text-center mt-3" style={{ width: '20rem' }}>
                        <div className="dropdown d-inline-block">
                            <button
                                className="border-0 bg-transparent p-0 dropdown-toggle"
                                type="button"
                                id="profilePicDropdownBtn"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={previewImage || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                                    className="rounded-circle"
                                    style={{
                                        height: "20rem",
                                        width: '20rem',
                                        objectFit: 'cover',
                                        border: '2px solid white',
                                        cursor: 'pointer',
                                    }}
                                    alt="Profile"
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
                                        href={user?.profilePic || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        👁 View Profile Picture
                                    </a>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleDeletePic}>
                                        ❌ Delete Profile Picture
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Edit icon stays outside dropdown */}
                        <i className="ri-file-edit-fill editBtn" onClick={handleToggle} />
                    </div>

                </div>

                <div className="card-body text-center">
                    {
                        updateModal ? (
                            <div id='updateProfile'>
                                <form className='rounded p-4' onSubmit={submitHandler}>
                                    <span className="close text-light" onClick={() => setUpdateModal(false)}>&times;</span>
                                    <h1 className='rounded text-center text-primary fw-bold fs-2 p-1 mb-3'>Update Profile</h1>

                                    <div className="d-flex justify-content-center align-items-center gap-2 form-group mb-3">
                                        <div className='w-50'>
                                            <label htmlFor="firstName" className='form-label mx-1'>First name:</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={data.fullName.firstName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div className='w-50'>
                                            <label htmlFor="lastName" className='form-label mx-1'>Last name:</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={data.fullName.lastName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3 d-flex justify-content-center align-items-center">
                                        <label htmlFor="userName" className='form-label mx-1 w-50'>Username:</label>
                                        <input
                                            type="text"
                                            name="userName"
                                            value={data.userName}
                                            onChange={handleChange}
                                            className="form-control w-50"
                                            placeholder="Enter username"
                                        />
                                    </div>

                                    <div className="form-group mb-3 d-flex justify-content-center align-items-center">
                                        <label htmlFor="email" className='form-label mx-1 w-25'>Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="form-control w-75"
                                            placeholder="Enter email"
                                        />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="profilePic" className='form-label mx-2'>Choose profile picture:</label>
                                        <input
                                            type="file"
                                            name="profilePic"
                                            accept="image/*"
                                            onChange={handleProfilePicChange}
                                            className="form-control"
                                        />
                                    </div>

                                    <input type="submit" value="Update" className='form-control btn btn-danger mb-2' />
                                </form>
                            </div>
                        ) : (
                            <div>
                                <p className="card-title">
                                    <i className="ri-shield-user-fill fs-4" />
                                    &nbsp; <span className='fs-4'>{user?.userName}</span>
                                </p>
                                <p className="card-title">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i className="ri-user-fill fs-5" />
                                    &nbsp;
                                    <span className='fs-6'>
                                        {user?.fullName?.firstName + " " + user?.fullName?.lastName}
                                    </span>
                                </p>
                                <p className="card-title">
                                    <i className="ri-mail-fill fs-5" />
                                    &nbsp;
                                    <span className='fs-6'>{user?.email}</span>
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
