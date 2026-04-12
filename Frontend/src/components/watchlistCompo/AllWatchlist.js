import { useEffect } from 'react';
import WatchListCard from '../cards/WatchList.Card';
import { useWatchlists } from '../../context/WatchlistContext';

const AllWatchlist = ({ setUpdateModal, setWatchlistId, setModal }) => {

  const { watchlists, fetchWatchlist } = useWatchlists();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist])


  return (
    <>
      <div id='watchlist'>
        <div className="w-100 mb-5 btns">

          <button onClick={() => setModal(true)} className="btn btn-primary">
            + New Watchlist
          </button>
          <h2 className='text-center text-bg-warning w-50 rounded text-nowrap'>All watchlist</h2>
        </div>

        <div className='d-flex justify-content-center gap-3 flex-wrap w-100 mb-3'>
          {
            watchlists.length === 0 ? (
              <div className="rounded-2">
                <h1 className='text-bg-dark text-center px-2 mb-0 py-1 fs-3 mt-5 rounded-2'>
                  No watchlists
                </h1>
              </div>
            ) :
              (
                watchlists.map((watchlist, idx) => {
                  return <WatchListCard key={watchlist._id} watchlist={watchlist} idx={idx} setUpdateModal={setUpdateModal} setWatchlistId={setWatchlistId} />
                }
                )
              )
          }
        </div>

      </div>
    </>
  )
}

export default AllWatchlist