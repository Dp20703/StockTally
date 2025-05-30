import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import NavbarCompo from '../../components/Navbar';

const Profile = () => {
    const { user } = useAuth();
    return (
        <div id='dashboard'>
            <NavbarCompo/>
            <div className='mt-5'>
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