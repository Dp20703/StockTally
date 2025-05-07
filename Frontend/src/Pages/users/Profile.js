import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [userdata, setUserdata] = useState({})
    const navigate = useNavigate();
    const fetchData = async () => {
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
        <div className="container mt-5">
            <div className="buttons">
                <Link to='/trade/dashboard' className="btn btn-info">View Dashboard</Link>
            </div>
            <div className="card m-auto text-center " style={{ width: '18rem' }}>
                <img src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{userdata.userName}</h5>
                    <p className="card-text">{userdata.fullName?.firstName + " " + userdata.fullName?.lastName}</p>
                    <p className="card-text">{userdata.email}</p>
                    <Link to='/logout' className="btn btn-danger">Logout</Link>
                </div>
            </div>
        </div>

    )
}

export default Profile