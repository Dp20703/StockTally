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
  const handleTradeId = (id) => { setTradeId(id) };

  return (
    <div id='dashboard' className='overflow-hidden min-vh-100'>
      <NavbarCompo />
      <div className="mb-3 mt-4 w-100">
        <button onClick={() => setModal(true)} className="btn btn-primary mx-5 float-start">
          + New Trade
        </button>
        <h2 className='text-center m-auto text-bg-warning w-50 rounded'>Dashboard</h2>
      </div>

      {/* All Trades */}
      <AllTrades handleTradeId={handleTradeId} setUpdateModal={setUpdateModal} setCloseModal={setCloseModal} />

      {/* Create Trade Modal */}
      {modal && <CreateTradeModal setModal={setModal} />}

      {/*Update Trade Modal */}
      {updateModal && <UpdateTradeModal tradeId={tradeId} setUpdateModal={setUpdateModal} />}

      {/* Close Trade Modal */}
      {closeModal && <CloseTradeModal tradeId={tradeId} setCloseModal={setCloseModal} />}

    </div>
  )
}

export default Dashboard