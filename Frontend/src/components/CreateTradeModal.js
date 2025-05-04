import '../App.css';

const CreateTradeModal = ({ setModal }) => {
    return (
        <div id="modal" onClick={() => setModal(false)}>
            <div id="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={() => setModal(false)}>&times;</span>
                <h2>Create Trade</h2>
            </div>
        </div>
    );
};

export default CreateTradeModal;
