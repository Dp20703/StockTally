import React from 'react'
import AddStock from '../../Pages/watchlist/AddStock'

const AddStockModal = ({ setAddStockModal, watchlistId }) => {
    return (
        <div>
            <div id="modal">
                <div id="modal-content" className='text-bg-dark'>
                    <span id='close' className='close fs-2 text-light'
                        onClick={() => setAddStockModal(false)} >
                        &times;
                    </span>
                    <AddStock setAddStockModal={setAddStockModal} watchlistId={watchlistId} />
                </div>
            </div>
        </div>
    )
}

export default AddStockModal