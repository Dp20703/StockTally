import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
    const { user } = useAuth();
    return (
        <div className="pt-3 h-100" id='profile'>
            <div className='d-flex justify-content-between px-5 mt-2'>
                <div>
                    <Link to='/trade/dashboard' className="btn btn-info">View Dashboard</Link>
                </div>

                <div>
                    <Link to={'/'} className="btn btn-success mx-2" >Home</Link>
                    <Link to='/logout' className="btn btn-danger my-2   ">Logout</Link>
                </div>
            </div>

            <div>
                <div style={{ background: '#13162F', color: 'white', backgroundPosition: 'center', backgroundSize: "cover", border: '.5px solid white' }} className="card m-auto bg-black text-center w-50 rounded-5 overflow-hidden">
                    <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        className=" w-50 m-auto rounded-circle mt-3 "
                        style={{ height: "25rem", objectFit: 'cover', objectPosition: 'center', border: '2px solid white', }}
                        alt="..." />
                    <div className="card-body">
                        <p className="card-title">
                            <i className="ri-shield-user-fill fs-4" />
                            &nbsp; <span className='fs-4'>{user?.userName}</span>
                        </p>
                        <p className="card-title">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="ri-user-fill fs-5" />
                            &nbsp;
                            <span className='fs-6'>
                                {user?.fullName?.firstName + " " + user?.fullName?.lastName}
                            </span>
                        </p>
                        <p className="card-title">
                            <i className="ri-mail-fill fs-5" />
                            &nbsp;
                            <span className='fs-6'>
                                {user?.email}</span></p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile