import React from 'react'
import AllWatchlist from '../../components/watchlistCompo/AllWatchlist'

const Watchlist = () => {
  return (
    <div className='min-vh-100 min-vw-100 bg-black'>
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        <div className='mx-5 mt-5'>
          <button onClick={() => (true)} className="btn btn-primary">
            + New Watchlist
          </button>
        </div>
        <div className='mx-5 mt-5 w-100 '>
          <AllWatchlist />
        </div>
      </div>
    </div>
  )
}

export default Watchlist