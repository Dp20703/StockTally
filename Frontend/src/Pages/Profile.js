import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [userdata, setUserdata] = useState({})
    const fetchData = async () => {
        const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("User profile details:", user.data);
        setUserdata(user.data);
        console.log("userdata:", userdata);
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="container">
            <div className="card m-auto text-center mt-5" style={{ width: '18rem' }}>
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