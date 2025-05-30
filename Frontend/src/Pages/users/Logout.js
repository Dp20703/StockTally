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
                console.log("User Logged out Successfully");
                toast.error("User Logged out Successfully",
                    {
                        position: "top-right",
                        autoClose: 1000,
                        onClose: () => {
                            navigate("/login");
                        }
                    }
                );
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                    localStorage.removeItem("token");
                    toast.error("Error logging out",
                        {
                            position: "top-right",
                            autoClose: 1000,
                        }
                    );
                }
            }
        })
    })
    return (
        <div>Logout....</div>
    )
}

export default Logout