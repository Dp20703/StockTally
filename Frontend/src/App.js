import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/users/Home';
import Login from './Pages/users/Login';
import Signup from './Pages/users/Signup';
import Profile from './Pages/users/Profile';
import Logout from './Pages/users/Logout';
import Dashboard from './Pages/trade/Dashboard';
import CreateTrade from './Pages/trade/CreateTrade';
import UserProtectWrapper from './Middleware/UserProtectWrapper';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<UserProtectWrapper><Profile /></UserProtectWrapper>} />
          <Route path='/logout' element={<UserProtectWrapper><Logout /></UserProtectWrapper>} />
          <Route path='/trade/dashboard' element={<UserProtectWrapper><Dashboard /></UserProtectWrapper>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App