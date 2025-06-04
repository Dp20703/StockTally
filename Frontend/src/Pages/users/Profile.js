import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import NavbarCompo from '../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [updateModal, setUpdateModal] = useState(false);
    const [data, setData] = useState({
        profilePic: user?.profilePic || "",
        userName: user?.userName || "",
        fullName: {
            firstName: user?.fullName.firstName || '',
            lastName: user?.fullName.lastName || '',
        },
        email: user?.email || '',
    });

    useEffect(() => {
        setData({
            profilePic: user.profilePic || "",
            userName: user.userName || "",
            fullName: {
                firstName: user.fullName.firstName || '',
                lastName: user.fullName.lastName || '',
            },
            email: user.email || '',
        });
    }, [user, setUpdateModal]);

    const handleToggle = () => {
        setUpdateModal(!updateModal);
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'firstName' || name === 'lastName') {
            setData((prev) => (
                {
                    ...prev, fullName: {
                        ...prev.fullName, [name]: value
                    }
                }
            ))
        }
        else if (name === 'profilePic') {
            setData((prev) =>
            ({
                ...prev,
                profilePic: files[0]
            })
            )
        }
        else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('profilePic', data.profilePic);
        formData.append('fullName[firstName]', data.fullName.firstName);
        formData.append('fullName[lastName]', data.fullName.lastName);

        try {
            const res = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/users/update_profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('res: ', res.data);
            setUser(res.data.user)
            toast.success('Profile updated successfully', {
                position: "top-right",
                autoClose: 1000,
            });
            setData({
                profilePic: "",
                userName: "",
                fullName: {
                    firstName: '',
                    lastName: '',
                },
                email: '',
            })
            setUpdateModal(false);
        } catch (err) {
            console.error('Update failed:', err);
            if (err.status === 500) {
                toast.error(err.response.data.details || 'Internal Server Error', {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
            else if (err.status === 409) {
                toast.error(err.response.data.message || 'Failed to update', {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
            else if (err.status === 400) {
                toast.error(err.response.data.message || 'All fields are required', {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
            else {
                toast.error('Update failed', {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
            setData({
                profilePic: "",
                userName: "",
                fullName: {
                    firstName: '',
                    lastName: '',
                },
                email: '',
            })
        }
    };

    return (
        <div id='dashboard'>
            <NavbarCompo />
            <div className='mt-3'>
                <div style={{ background: '#13162F', color: 'white', backgroundPosition: 'center', backgroundSize: "cover", border: '.5px solid white' }} className="card m-auto bg-black w-50 rounded-5 overflow-hidden">
                    <div className='d-flex justify-content-center align-items-center'>
                        <a href={`${process.env.REACT_APP_BACKEND_URL}/${user.profilePic}`}>
                            <img
                                src={user.profilePic ? `${process.env.REACT_APP_BACKEND_URL}/${user.profilePic}` : `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                                className=" m-auto rounded-circle mt-3 "
                                style={{ height: "20rem", width: '20rem', objectFit: 'cover', objectPosition: 'center', border: '2px solid white', }}
                                alt="..." />
                        </a>
                        <i className="ri-file-edit-fill position-absolute" style={{ top: '18rem', right: '15rem', fontSize: '1.5rem', cursor: 'pointer' }} onClick={handleToggle} />
                    </div>
                    <div className="card-body text-center">
                        {
                            updateModal ?
                                (
                                    <div id='updateProfile'>
                                        <div >
                                            <form className='rounded p-4' encType='multipart/form-data'>
                                                <span className="close text-light" onClick={() => setUpdateModal(false)}>&times;</span>
                                                <h1 className='rounded text-center text-primary fw-bold fs-2 p-1 mb-3'>Update Profile</h1>

                                                <div className="fullName d-flex justify-content-center align-items-center gap-2 form-group mb-3">
                                                    <div className='w-50'>
                                                        <label htmlFor="firstName" className='form-label mx-1'>Enter first name:</label>

                                                        <input type="text" name="firstName" value={data.fullName?.firstName} onChange={handleChange} className="form-control" placeholder="enter first name" />
                                                    </div>
                                                    <div className='w-50'>
                                                        <label htmlFor="lastName" className='form-label mx-1'>Enter last name:</label>
                                                        <input type="text" name="lastName" value={data.fullName?.lastName} onChange={handleChange} className="form-control" placeholder="enter last name" />
                                                    </div>
                                                </div>

                                                <div className="form-group mb-3 d-flex justify-content-center align-items-center">
                                                    <label htmlFor="userName" className='form-label mx-1 w-50'>Enter username:</label>
                                                    <input type="text" name="userName" className="form-control mb-2 w-50" placeholder="enter username" value={data.userName} onChange={handleChange} />
                                                </div>

                                                <div className="form-group mb-3 d-flex justify-content-center align-items-center">
                                                    <label htmlFor="email" className='form-label mx-1 w-25'>Enter email:</label>
                                                    <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2 w-75" placeholder='enter email' />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="profilePic" className='form-label mx-2'>Select profile picture:</label>
                                                    <input type="file" name="profilePic" onChange={handleChange} />
                                                </div>


                                                <input type="submit" onClick={submitHandler} value="Update" className='form-control btn btn-danger mb-2' />
                                            </form>
                                        </div>
                                    </div>
                                )
                                : (
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
                                            <span className='fs-6'>
                                                {user?.email}</span></p>
                                    </div>
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile