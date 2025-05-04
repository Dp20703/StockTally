import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className='container vh-100'>

      <div className='d-flex justify-content-center align-content-center flex-column  w-50  p-2 mt-5 m-auto border border-1 rounded border-gray'>
        <form>
          <h1 className='rounded text-center text-bg-primary fs-2 p-2'>Login form</h1>
          <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2" placeholder='enter email' />
          <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control mb-2" placeholder='enter password' />
          <input type="submit" onClick={submitHandler} value="submit" className='form-control' />
        </form>
      </div>
      <div className='fs-5 text-center mt-2 '>Don't have an account? <Link className='text-decoration-none' to='/signup'>Register</Link></div>
    </div>

  )
}


export default Login