import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/users/Home';
import Login from './Pages/users/Login';
import Signup from './Pages/users/Signup';
import Profile from './Pages/users/Profile';
import Logout from './Pages/users/Logout';
import Dashboard from './Pages/trade/Dashboard';
import UserProtectWrapper from './Middleware/UserProtectWrapper';
import Watchlist from './Pages/watchlist/Watchlist';
import { StockCharts } from './Pages/charts/StockCharts';
import TopStories from './Pages/charts/TopStories';
import NotFound from './Pages/users/NotFound';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/profile' element={<UserProtectWrapper><Profile /></UserProtectWrapper>} />
          <Route path='/logout' element={<UserProtectWrapper><Logout /></UserProtectWrapper>} />
          <Route path='/trade/dashboard' element={<UserProtectWrapper><Dashboard /></UserProtectWrapper>} />
          <Route path='/trade/watchlist' element={<UserProtectWrapper><Watchlist /></UserProtectWrapper>} />
          <Route path='/chart/showchart' element={<UserProtectWrapper><StockCharts /></UserProtectWrapper>} />
          <Route path='/chart/topstories' element={<UserProtectWrapper><TopStories /></UserProtectWrapper>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App