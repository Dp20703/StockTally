import { useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../Services/apiClient';

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
      const user = await api.post("/users/login", data);

      localStorage.setItem('token', user?.data?.token);
      setUser(user?.data?.user);

      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => {
          navigate('/profile')
        }
      })

    } catch (error) {
      if (error?.response?.status === 500) {
        toast.error("Invalid email or password.",
          {
            position: "top-right",
            autoClose: 1000,
          })
      }
      else if (error?.response?.status === 400) {
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
          <div className="poster">
            <img src="../images/login_poster.png" alt="no-image" />
          </div>

          <div className='loginForm'>
            <h1 className='rounded text-center text-dark fw-bold fs-1 p-1 mb-4'>Welcome back</h1>
            <form>
              <div className="form-group mb-4">
                <label htmlFor="email" className='from-label fw-bolder mx-1 my-2'>Enter email</label>
                <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control mb-2 rounded-5 py-3" placeholder='xyz@gmail.com' />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="password" className='from-label fw-bolder mx-1 my-2'>Enter password</label>
                <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control rounded-5 py-3" placeholder='enter your password' />
              </div>

              <button type="submit" onClick={submitHandler} value="Login" className='form-control btn btn-dark mb-2 rounded-5 py-3 fs-5 ' >
                Sign in
              </button>
            </form>

            <div id='login-text' className='text-center mt-3'>
              New to StockTally?{" "}
              <Link
                className='text-dark fw-bold'
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                to='/signup'>Create account →</Link>
            </div>
          </div>



        </div>
      </div >
    </>

  )
}


export default Login