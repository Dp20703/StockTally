import React from 'react'
import CreateWatchlist from '../../Pages/watchlist/CreateWatchlist'

const CreateWatchlistModal = ({ setModal }) => {
    return (
        <div>
            <div id="modal">
                <div id="create-watchlist-modal" className='text-bg-dark'>
                    <span id='close' className='close'
                        onClick={() => setModal(false)} >
                        &times;
                    </span>
                    <CreateWatchlist setModal={setModal} />
                </div>
            </div>
        </div>
    )
}

export default CreateWatchlistModal