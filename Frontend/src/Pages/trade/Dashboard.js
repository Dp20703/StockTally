import { useState } from 'react'
import CreateTradeModal from '../../components/TradeCompo/CreateTradeModal'
import AllTrades from '../../components/TradeCompo/AllTrades';
import UpdateTradeModal from '../../components/TradeCompo/UpdateTradeModal';
import CloseTradeModal from '../../components/TradeCompo/CloseTradeModal';
import NavbarCompo from '../../components/Navbar';

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [tradeId, setTradeId] = useState(null);
  const [showClosedTrades, setShowClosedTrades] = useState(false);
  const [showTrades, setshowTrades] = useState('open');
  const handleTradeId = (id) => { setTradeId(id) };

  const tradesToggle = () => {
    setShowClosedTrades((prevState) => !prevState);
    setshowTrades(!showClosedTrades ? 'closed' : 'open');
  }

  return (
    <div>
      <div id='dashboard'>
        <NavbarCompo />

        <div className="btns mb-3 mt-4 gap-5 w-100 d-flex justify-content-around align-items-center">
          <button onClick={() => setModal(true)} className="btn btn-primary">
            + New Trade
          </button>
          <h2 className='text-center w-50 text-bg-warning rounded p-1'>Dashboard</h2>
          <button onClick={tradesToggle} className={!showClosedTrades ? "btn btn-danger " : "btn btn-success "}>
            {showClosedTrades ? "Open Trades" : "Closed Trades"}
          </button>
        </div>

        {/* All Trades */}
        <AllTrades handleTradeId={handleTradeId} setUpdateModal={setUpdateModal} setCloseModal={setCloseModal} showTrades={showTrades} />

        {/* Create Trade Modal */}
        {modal && <CreateTradeModal setModal={setModal} />}

        {/*Update Trade Modal */}
        {updateModal && <UpdateTradeModal tradeId={tradeId} setUpdateModal={setUpdateModal} />}

        {/* Close Trade Modal */}
        {closeModal && <CloseTradeModal tradeId={tradeId} setCloseModal={setCloseModal} />}

      </div >
    </div>
  )
}

export default Dashboard