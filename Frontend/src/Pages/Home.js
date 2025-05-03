import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("../images/stock1.jpg")', backgroundPosition: 'center', backgroundSize: "cover" }}>

            <div className="text-center">
                <h1 className="py-5 px-3  rounded-3 border-3 border-black " style={{ color: '#001257 ', backgroundColor: '#F39F2B' }}>Get Started with StockTally</h1>
                <div className="d-flex gap-5 mt-3 justify-content-center align-items-center">
                    <Link to={'/login'} className="btn btn-danger px-3 py-2 rounded" >Login</Link>
                    <Link to={'/signup'} className="btn btn-success px-3 py-2 rounded" >SignUp</Link>
                </div>
            </div>

        </div>
    )
}

export default Home