import { useState } from 'react'
import AllWatchlist from '../../components/watchlistCompo/AllWatchlist'
import CreateWatchlistModal from '../../components/watchlistCompo/CreateWatchlistModal';
import UpdateWatchlistModal from '../../components/watchlistCompo/UpdateWatchlistModal';
import NavbarCompo from '../../components/Navbar';

const Watchlist = () => {
  const [watchlistId, setWatchlistId] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <div id='dashboard'>
        <NavbarCompo/>  
        
        {/* All watchlist */}
        <AllWatchlist setUpdateModal={setUpdateModal} setWatchlistId={setWatchlistId} setModal={setModal} />

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