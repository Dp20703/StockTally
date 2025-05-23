import CreateTrade from '../Pages/trade/CreateTrade';

const CreateTradeModal = ({ setModal }) => {
    return (
        <div id="modal" >
            <div id="modal-content" className='text-bg-dark'>
                <span className="close text-light" onClick={() => setModal(false)}>&times;</span>
                <CreateTrade setModal={setModal} />
            </div>
        </div>
    );
};

export default CreateTradeModal;
