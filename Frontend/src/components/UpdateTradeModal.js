import UpdateTrade from '../Pages/trade/UpdateTrade';
import '../App.css'

const UpdateTradeModal = ({ tradeId, setUpdateModal }) => {
    console.log("tradeId:", tradeId);

    return (
        <div id="modal" >
            <div id="modal-content">
                <span className="close" onClick={() => setUpdateModal(false)}>&times;</span>
                <UpdateTrade tradeId={tradeId} setUpdateModal={setUpdateModal} />
            </div>
        </div>
    )
}

export default UpdateTradeModal