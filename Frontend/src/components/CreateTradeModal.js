import '../App.css';
import CreateTrade from '../Pages/trade/CreateTrade';

const CreateTradeModal = ({ setModal }) => {
    return (
        <div id="modal" >
            <div id="modal-content">
                <span className="close" onClick={() => setModal(false)}>&times;</span>
                <CreateTrade setModal={setModal} />
            </div>
        </div>
    );
};

export default CreateTradeModal;
