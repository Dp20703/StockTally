import { useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Services/apiClient';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

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

            const newUser = await api.post("/users/register", data);
            setUser(newUser?.data?.user)

            toast.success("Registration successfully", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/login')
                }
            })

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
                    <div className="registerForm">
                        <div >
                            <h1 className='rounded text-center text-black fw-bold fs-1 mb-4'>Create Account</h1>

                            <form>
                                <div className="form-group mb-4">
                                    <label htmlFor="userName" className='from-label fw-bolder mx-1 my-2'>Enter username</label>
                                    <input type="text" name="userName" className="form-control rounded-5 py-3 mb-2"
                                        placeholder="enter username" value={data.userName} onChange={handleChange} />
                                </div>

                                <div className="fullName d-flex justify-content-center align-items-center gap-2 form-group mb-2">
                                    <div className='w-50'>
                                        <label htmlFor="firstName" className='from-label fw-bolder mx-1 my-2'>Enter first name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={data.fullName.firstName} onChange={handleChange} className="form-control rounded-5 py-3" placeholder="enter firstname" />
                                    </div>
                                    <div className='w-50'>
                                        <label htmlFor="lastName" className='from-label fw-bolder mx-1 my-2'>Enter last name</label>
                                        <input type="text" name="lastName" value={data.fullName.lastName} onChange={handleChange} className="form-control rounded-5 py-3 " placeholder="enter lastname" />
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="email" className='from-label fw-bolder mx-1 my-2'>Enter email</label>
                                    <input type="email" value={data.email} name='email' onChange={handleChange} className="form-control rounded-5 py-3 mb-2" placeholder='xyz@gmail.com' />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="password" className='from-label fw-bolder mx-1 my-2'>Enter password</label>
                                    <input type="password" value={data.password} name='password' onChange={handleChange} className="form-control rounded-5 py-3 mb-2" placeholder='enter your password' />
                                </div>

                                <input type="submit" onClick={submitHandler} value="Register" className='form-control rounded-5 py-3 btn btn-dark mb-2 rounded-5 py-3 fs-5' />
                            </form>
                        </div>

                        <div id='login-text' className='text-center mt-3'>Alreay have an account?{" "}
                            <Link
                                className='fw-bold text-dark' to='/login'
                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            >Login →</Link>
                        </div>
                    </div>
                    <div className="poster">
                        <img src="../images/login_poster.png" alt="..." />
                    </div>
                </div>
            </div>
        </>)
}


export default Signup