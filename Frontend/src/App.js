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
          <Route path='/trade/dashboard' element={<Dashboard />} />
          <Route path='/trade/create' element={<CreateTrade />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App