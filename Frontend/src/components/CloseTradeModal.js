import React from 'react'
import CloseTrade from '../Pages/trade/CloseTrade'

const CloseTradeModal = ({ tradeId, setCloseModal }) => {
    return (
        <div id="modal" >
            <div id="modal-content"  className=' text-bg-dark' >
                <span className="close text-light" onClick={() => setCloseModal(false)}>&times;</span>
                <CloseTrade tradeId={tradeId} setCloseModal={setCloseModal} />
            </div>
        </div>
    )
}

export default CloseTradeModal