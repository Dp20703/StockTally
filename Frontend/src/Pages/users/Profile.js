import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
    const [userdata, setUserdata] = useState({})
    const navigate = useNavigate();
    const fetchData = async () => {
        const token = localStorage.getItem("token");

        const toastId = "login-required";
        if (!token) {

            toast.error("Please login first", {
                toastId, // prevents duplicate toasts
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate("/login");
                }
            });
        }
        try {
            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('user data:', user);
            console.log("User profile details:", user.data);
            setUserdata(user.data);
            console.log("userdata:", userdata);
        }
        catch (error) {
            if (error.response.status == 401) {
                console.log("Unauthorized");
                return navigate('/login');
            }
            console.log("Error while fetching user data:", error);
            return navigate('/login');
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="pt-3 h-100" id='profile'>
            <div className='d-flex justify-content-between px-5 mt-2'>
                <div>
                    <Link to='/trade/dashboard' className="btn btn-info">View Dashboard</Link>
                </div>

                <div>
                    <Link to={'/'} className="btn btn-success mx-2" >Home</Link>
                       <Link to='/logout' className="btn btn-danger my-2   ">Logout</Link>
                </div>
            </div>
            <div>
                <div style={{ background: '#13162F',color:'white', backgroundPosition: 'center', backgroundSize: "cover",border:'.5px solid white' }} className="card m-auto text-center w-50 rounded-5 overflow-hidden">
                    <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        className=" w-50 m-auto rounded-circle mt-3 "
                        style={{ height: "25rem", objectFit: 'cover', objectPosition: 'center', border: '1px solid #37A5F5', boxShadow: "0 0 8px 4px #37A5F5" }}
                        alt="..." />
                    <div className="card-body">
                        <p className="card-title">
                            <i className="ri-shield-user-fill fs-4" />
                            &nbsp; <span className='fs-4'>{userdata.userName}</span>
                        </p>
                        <p className="card-title">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="ri-user-fill fs-5" />
                            &nbsp;
                            <span className='fs-6'>
                                {userdata.fullName?.firstName + " " + userdata.fullName?.lastName}
                            </span>
                        </p>
                        <p className="card-title">
                            <i className="ri-mail-fill fs-5" />
                            &nbsp;
                            <span className='fs-6'>
                                {userdata.email}</span></p>
                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile