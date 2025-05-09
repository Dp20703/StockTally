import { Link } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return (
            <>
                <div className="nav w-100 " style={{ height: '2.7rem', fontSize: '1.2rem' }}>
                    <div className="d-flex justify-content-between px-5 align-items-center w-100">
                        <div className="logo">Logo</div>
                        <div className="links">
                            <div className='ul d-flex  justify-content-center gap-3 w-100 align-items-center '>
                                <Link to='/' className='li'>Home</Link>
                                <Link to='/about' className='li'>About</Link>
                                <Link to='/login' className='li'>Login</Link>
                                <Link to='/signup' className='li'>SignUp</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="nav w-100 " style={{ height: '2.7rem', fontSize: '1.2rem' }}>
                <div className="d-flex justify-content-between px-5 align-items-center w-100">
                    <div className="logo">Logo</div>
                    <div className="links">
                        <div className='ul d-flex  justify-content-center gap-3 w-100 align-items-center '>
                            <Link to='/' className='li'>Home</Link>
                            <Link to='/about' className='li'>About</Link>
                            <Link to='/trade/dashboard' className='li'>Dashboard</Link>
                            <Link to='/profile' className='li'>Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar