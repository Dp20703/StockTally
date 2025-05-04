import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateTradeModal from '../../components/CreateTradeModal'
import AllTrades from '../../components/AllTrades';
import UpdateTradeModal from '../../components/UpdateTradeModal';

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [tradeId, setTradeId] = useState(null);
  const handleTradeId = (id) => { setTradeId(id) };
  return (
    <>
      <div className="d-flex justify-content-around align-items-center mb-3 text-center mt-3">
        <button onClick={() => setModal(true)} className="btn btn-primary">
          + New Trade
        </button>
        {modal && <CreateTradeModal setModal={setModal} />}
        <h2 className='text-center'>Dashboard</h2>
        <div className='d-flex  gap-2'>
          <Link to={'/'} className="btn btn-success" >Home</Link>
          <Link to={'/profile'} className="btn btn-info" >Profile</Link>
          <Link to={'/logout'} className="btn btn-danger" >Logout</Link>
        </div>
      </div>
      <AllTrades handleTradeId={handleTradeId} setUpdateModal={setUpdateModal} />
      {
        updateModal && <UpdateTradeModal tradeId={tradeId} setUpdateModal={setUpdateModal} />
      }

    </>
  )
}

export default Dashboard