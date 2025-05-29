import React, { useState } from 'react'
import AllWatchlist from '../../components/watchlistCompo/AllWatchlist'
import { Link } from 'react-router-dom'
import CreateWatchlistModal from '../../components/watchlistCompo/CreateWatchlistModal';
import UpdateWatchlistModal from '../../components/watchlistCompo/UpdateWatchlistModal';

const Watchlist = () => {
  const [watchlistId, setWatchlistId] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <div className='min-vh-100 min-vw-100 bg-dark overflow-hidden'>

      <div className="d-flex py-2 pt-3  justify-content-between align-items-center w-100">
        <div className='mx-3'>
          <button onClick={() => setModal(true)} className="btn btn-primary">
            + New Watchlist
          </button>
        </div>
        <div>
          <Link to='/trade/dashboard' className="btn btn-info mx-2">Dashboard</Link>
          <Link to='/profile' className="btn btn-success mx-2">Profile</Link>
          <Link to='/logout' className="btn btn-danger mx-2">Logout</Link>
        </div>
      </div>

      <div className='w-100'>
        <AllWatchlist setUpdateModal={setUpdateModal} setWatchlistId={setWatchlistId} />
      </div>

      {
        modal && <CreateWatchlistModal setModal={setModal} />
      }

      {
        updateModal && <UpdateWatchlistModal setUpdateModal={setUpdateModal} watchlistId={watchlistId} />
      }
    </div>
  )
}

export default Watchlist