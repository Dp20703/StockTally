import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
            console.log("Data :", data);
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
                    toast.error("Please fill in all required fields.");
                } else if (error.response.status === 409) {
                    toast.error("Email already exists. Try another.");
                } else {
                    toast.error("An unexpected error occurred. Try again later.");
                }
            }
            console.log("Error while registration:", error);
            toast.error("Registration Failed", {
                position: "top-right",
                autoClose: 1500,
            });
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
        <div className='container vh-100'>

            <div className='d-flex justify-content-center align-content-center flex-column  w-50  p-2 mt-5 m-auto'>
                <form>
                    <h1 className='rounded text-center text-bg-primary fs-2'>Registration form</h1>

                <input type="text" name="userName" className="form-control mb-2" placeholder="enter username" value={data.userName} onChange={handleChange} />
                    <div className="fullName d-flex gap-2 form-group mb-2">
                        <input type="text" name="firstName" value={data.fullName.firstName} onChange={handleChange} className="form-control" placeholder="first name" />
                        <input type="text" name="lastName" value={data.fullName.lastName} onChange={handleChange} className="form-control" placeholder="last name" />
                    </div>
                    <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2" placeholder='enter email' />
                    <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control mb-2" placeholder='enter password' />
                    <input type="submit" onClick={submitHandler} value="submit" className='form-control' />
                </form>
            </div>
        </div>

    )
}


export default Signup