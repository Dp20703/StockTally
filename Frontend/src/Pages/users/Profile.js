import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import NavbarCompo from '../../components/Navbar';
import { useState } from 'react';

const Profile = () => {
    const { user } = useAuth();
    const [updateModal, setUpdateModal] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
alert('submited')
    }
    return (
        <div id='dashboard'>
            <NavbarCompo />
            <div className='mt-3'>
                <div style={{ background: '#13162F', color: 'white', backgroundPosition: 'center', backgroundSize: "cover", border: '.5px solid white' }} className="card m-auto bg-black w-50 rounded-5 overflow-hidden">
                    <img
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
                        className=" m-auto rounded-circle mt-3 "
                        style={{ height: "20rem", width: '20rem', objectFit: 'cover', objectPosition: 'center', border: '2px solid white', }}
                        alt="..." />

                    <i className="ri-file-edit-fill position-absolute" style={{ top: '18rem', right: '15rem', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setUpdateModal(true); }} />

                    <div className="card-body text-center">
                        {
                            updateModal &&
                            <div className="py-3 w-50 m-auto border border-2 rounded-3">
                                <input type="file" name="profilePic" />
                                <div className="d-flex justify-content-between py-2 px-3">
                                    <button className="btn btn-danger" onClick={() => { setUpdateModal(false); }}>Cancel</button>
                                    <button type='submit' className="btn btn-success" onClick={handleUpdate}>Update</button>
                                </div>
                            </div>
                        }
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