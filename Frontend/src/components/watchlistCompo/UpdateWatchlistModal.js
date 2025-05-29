import React from 'react'
import UpdateWatchlist from '../../Pages/watchlist/UpdateWatchlist'

const UpdateWatchlistModal = ({ setUpdateModal, watchlistId }) => {
    return (
        <div>
            <div id="modal">
                <div id="modal-content" className='text-bg-dark'>
                    <span id='close' className='close'
                        onClick={() => setUpdateModal(false)} >
                        &times;
                    </span>
                    <UpdateWatchlist setUpdateModal={setUpdateModal} watchlistId={watchlistId} />
                </div>
            </div>
        </div>
    )
}

export default UpdateWatchlistModal