import React, { useState } from 'react'
import AllWatchlist from '../../components/watchlistCompo/AllWatchlist'
import { Link } from 'react-router-dom'
import CreateWatchlistModal from '../../components/watchlistCompo/CreateWatchlistModal';
import UpdateWatchlistModal from '../../components/watchlistCompo/UpdateWatchlistModal';
import NavbarCompo from '../../components/Navbar';

const Watchlist = () => {
  const [watchlistId, setWatchlistId] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <div className='overflow-hidden min-vh-100' id='dashboard'>
        <NavbarCompo />
        <div className="mb-3 mt-4 w-100">
          <button onClick={() => setModal(true)} className="btn btn-primary mx-5 float-start">
            + New Watchlist
          </button>
          <h2 className='text-center m-auto text-bg-warning w-50 rounded'>All watchlist</h2>
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
    </>
  )
}

export default Watchlist