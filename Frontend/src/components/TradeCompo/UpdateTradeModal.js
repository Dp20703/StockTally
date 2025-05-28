import UpdateTrade from '../../Pages/trade/UpdateTrade';

const UpdateTradeModal = ({ tradeId, setUpdateModal }) => {
    return (
        <div id="modal" >
            <div id="modal-content" className='text-bg-dark'>
                <span className="close text-light" onClick={() => setUpdateModal(false)}>&times;</span>
                <UpdateTrade tradeId={tradeId} setUpdateModal={setUpdateModal} />
            </div>
        </div>
    )
}

export default UpdateTradeModal