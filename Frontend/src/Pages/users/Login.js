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

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("Please fill in all required fields.", {
        autoClose: 1000,
      });
    }

    try {
      const user = await api.post("/users/login", data);

      localStorage.setItem('token', user?.data?.token);
      setUser(user?.data?.user);

      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 1000,
        onClose: () => navigate('/profile'),
      })

    } catch (error) {
      toast.error(
        error?.response?.status === 500
          ? "Invalid email or password."
          : "Login Failed",
        { autoClose: 1000 }
      );

      setData({ email: "", password: "" });
    }
  };


  return (
    <main className="login">
      <section className="wrapper">
        <figure className="poster">
          <img src="../images/login_poster.png" alt="Login illustration" />
        </figure>

        <section className='loginForm'>
          <header>
            <h1 className='text-center fw-bold mb-4'>Welcome back</h1>
          </header>

          <form onSubmit={submitHandler} noValidate>

            <section className="mb-3">
              <label htmlFor="email" className='fw-bold mx-1'>Enter email</label>
              <input
                type="email"
                id='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                className="form-control rounded-5 py-3 my-2"
                placeholder='xyz@gmail.com'
                autoComplete='email'
                required />
            </section>

            <section className="mb-4">

              <label htmlFor="password" className='fw-bold my-2 mx-1'>Enter password</label>

              <div className="position-relative">

                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                  className="form-control rounded-5 py-3 mb-3 pe-5" placeholder='enter your password'
                  autoComplete="current-password"
                  required
                />
                <button
                  type='button'
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className='position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent fs-5'
                  onClick={() => setShowPassword((prev) => !prev)} >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </section>

            <button
              type="submit"
              className='btn btn-dark mb-2 w-100 rounded-5 py-3 fs-5 ' >
              Sign in
            </button>
          </form>

          <footer id='login-text' className='text-center mt-3'>
            <p>
              New to StockTally?{" "}
              <Link
                className='text-dark fw-bold'
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                to='/signup'>Create account →
              </Link>
            </p>
          </footer>
        </section>

      </section>
    </main >
  )
}


export default Login