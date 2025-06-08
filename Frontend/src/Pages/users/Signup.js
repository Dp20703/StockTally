import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        userName: '',
        fullName: {
            firstName: '',
            lastName: '',
        },
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'firstName' || name === 'lastName') {
            setData({
                ...data, fullName: {
                    ...data.fullName, [name]: value
                }
            })
        }
        else {
            setData({ ...data, [name]: value })
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newUser = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, data);
            toast.success("Registration successfully", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/login')
                }
            })
            console.log("newUser:", newUser);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error("Please fill in all required fields.",
                        {
                            position: "top-right",
                            autoClose: 1000,
                        })
                }
                else if (error.response.status === 409) {
                    toast.error("Email already exists. Try another.");
                }
                else if (error.response.status === 410) {
                    toast.error("Username already exists. Try another.");
                }
                else {
                    toast.error("An unexpected error occurred. Try again later.");
                }
            }
            console.log("Error while registration:", error);
            setData({
                userName: '',
                fullName: {
                    firstName: '',
                    lastName: ""
                },
                email: "",
                password: "",
            });
        }

    }
    return (
        <>
            <div className="login">
                <div className="registerWrapper">
                    <div className="poster">
                        <img src="../images/bull4.jpg" alt="..." style={{ minHeight: '35rem' }} />
                    </div>
                    <div className="registerForm">
                        <div >
                            <h1 className='rounded text-center text-primary fw-bold fs-2 p-1 mb-3'>Register Account</h1>

                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="userName" className='form-label mx-1'>Enter username:</label>
                                    <input type="text" name="userName" className="form-control mb-2" placeholder="enter username" value={data.userName} onChange={handleChange} />
                                </div>

                                <div className="fullName d-flex justify-content-center align-items-center gap-2 form-group mb-2">
                                    <div className='w-50'>
                                        <label htmlFor="firstName" className='form-label mx-1'>Enter first name:</label>
                                        <input type="text" name="firstName" value={data.fullName.firstName} onChange={handleChange} className="form-control" placeholder="enter firstname" />
                                    </div>
                                    <div className='w-50'>
                                        <label htmlFor="lastName" className='form-label mx-1'>Enter last name:</label>
                                        <input type="text" name="lastName" value={data.fullName.lastName} onChange={handleChange} className="form-control " placeholder="enter lastname" />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email" className='form-label mx-1'>Enter email:</label>
                                    <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2" placeholder='enter email' />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="password" className='form-label mx-1'>Enter password:</label>
                                    <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control mb-2" placeholder='enter your password' />
                                </div>

                                <input type="submit" onClick={submitHandler} value="Register" className='form-control btn btn-danger mb-2' />
                            </form>
                        </div>

                        <div className='fs-5 text-center mt-2 '>Alreay have an account? <Link className='text-decoration-none' to='/login'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}


export default Signup