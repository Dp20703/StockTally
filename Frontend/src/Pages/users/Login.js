import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
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
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, data);
      localStorage.setItem('token', user.data.token);
      setUser(user.data.user);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate('/profile')
        }
      })
    } catch (error) {
      if (error.response.status === 500) {
        toast.error("Invalid email or password.",
          {
            position: "top-right",
            autoClose: 1000,
          })
      }
      else if (error.response.status === 400) {
        toast.error("Please fill in all required fields.",
          {
            position: "top-right",
            autoClose: 1000,
          })
      }
      else {
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setData({
        email: "",
        password: "",
      });
    }

  }
  return (
    <>
      <div className="login">
        <div className="wrapper">

          <div className='loginForm'>
            <div>
              <h1 className='rounded text-center text-primary fw-bold fs-2 p-1 mb-3'>Login Account</h1>

              <form>
                <div className="form-group mb-3">
                  <label htmlFor="email" className='form-label mx-1'>Enter email:</label>
                  <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2" placeholder='xyz@gmail.com' />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className='form-label mx-1'>Enter password:</label>
                  <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control" placeholder='enter your password' />
                </div>

                <button type="submit" onClick={submitHandler} value="Login" className='form-control btn btn-danger mb-2' >
                  Login
                </button>
              </form>
            </div>

            <div className='fs-5 text-center mt-2 '>Don't have an account? <Link className='text-decoration-none' to='/signup'>Register</Link>
            </div>
          </div>

          <div className="poster">
            <img src="../images/bull2.jpg" alt="..." />
          </div>
        </div>
      </div>
    </>

  )
}


export default Login