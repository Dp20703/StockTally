import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    console.log("User Logout page loading..");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("token");
                toast.error("User Logged out Successfully");
                console.log("User Logged out Successfully");
                navigate("/login");
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                    toast.error("Session expired, please login again.");
                    navigate("/login");
                } else {
                    alert("Error logging out");
                }
            }
        })
    })
    return (
        <div>Logout....</div>
    )
}

export default Logout