import React from 'react'
import CreateWatchlist from '../../Pages/watchlist/CreateWatchlist'

const CreateWatchlistModal = ({ setModal }) => {
    return (
        <div>
            <div id="modal">
                <div id="modal-content" className='text-bg-dark ' style={{ width: '35%' }}>
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