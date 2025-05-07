import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
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
      const user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, data);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate('/profile')
        }
      })
      console.log("Loggedin user details:", user.data);
      localStorage.setItem('token', user.data.token);

    } catch (error) {
      console.log("Error while login:", error);
      toast.error("Login Failed", {
        position: "top-right",
        autoClose: 1500,
      });
      setData({
        email: "",
        password: "",
      });
    }

  }
  return (
    <>
      {/* <Navbar /> */}
      <div className='container vh-100'>
        <div className='w-75 p-2 mt-5 m-auto '>
          <h1 className='rounded text-center text-bg-primary fs-2 p-1 mb-3'>Login form</h1>

          <form className='p-2 border border-1 rounded border-gray'>
            <div className="form-group mb-3">
              <label htmlFor="email" className='form-label mx-1'>Enter email:</label>
              <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2" placeholder='xyz@gmail.com' />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className='form-label mx-1'>Enter password:</label>
              <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control" placeholder='enter your password' />
            </div>

            <input type="submit" onClick={submitHandler} value="Login" className='form-control btn btn-danger mb-2' />
          </form>
        </div>
        <div className='fs-5 text-center mt-2 '>Don't have an account? <Link className='text-decoration-none' to='/signup'>Register</Link></div>
      </div>
    </>

  )
}


export default Login