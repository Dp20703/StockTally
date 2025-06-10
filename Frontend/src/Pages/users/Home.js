import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-white">Loading...</div>;
    // console.log("user: ", user);

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                backgroundImage: 'url("../images/stock1.jpg")',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100dvh',
            }}
        >
            <div className="text-center">
                <h1
                    className="py-5 px-3 rounded-3 border-3 border-black"
                    style={{ color: '#001257', backgroundColor: '#F39F2B' }}
                >
                    Get Started with StockTally
                </h1>
                {user ? (
                    <div className="mt-3">
                        <h4 className="mb-3 text-white">
                            Welcome, <span className="text-dark">{user?.fullName?.firstName + " " + user?.fullName?.lastName || "User"}</span>!
                        </h4>
                        <Link to="/profile" className="btn btn-success px-3 py-2 rounded">
                            Go to Profile
                        </Link>
                    </div>
                ) : (<div className="d-flex gap-4 mt-3 justify-content-center align-items-center">
                    <Link to="/login" className="btn btn-danger px-3 py-2 rounded">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success px-3 py-2 rounded">
                        Sign Up
                    </Link>
                </div>)}
            </div>
        </div>
    );
};

export default Home;
