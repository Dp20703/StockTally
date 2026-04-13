import { useState } from 'react';
import CreateTradeModal from '../../components/TradeCompo/CreateTradeModal';
import AllTrades from '../../components/TradeCompo/AllTrades';
import UpdateTradeModal from '../../components/TradeCompo/UpdateTradeModal';
import CloseTradeModal from '../../components/TradeCompo/CloseTradeModal';
import NavbarCompo from '../../components/Navbar';

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [tradeId, setTradeId] = useState(null);
  const [showTrades, setShowTrades] = useState('open');

  const handleTradeId = (id) => setTradeId(id);

  const tradesToggle = () => {
    setShowTrades((prev) => (prev === 'open' ? 'closed' : 'open'));
  };

  const isClosed = showTrades === 'closed';

  return (
    <main id="dashboard">

      {/* ✅ Header */}
      <header>
        <NavbarCompo />
      </header>

      {/* ✅ Page Controls */}
      <section
        className="btns w-100 mb-3 mt-4 gap-5 d-flex justify-content-around align-items-center"
        aria-label="Dashboard Controls"
      >
        <button
          onClick={() => setModal(true)}
          className="btn btn-primary"
        >
          + New Trade
        </button>

        <h1 className="text-center w-50 text-bg-warning rounded p-1">
          Dashboard
        </h1>

        <button
          onClick={tradesToggle}
          className={`btn ${isClosed ? 'btn-success' : 'btn-danger'}`}
        >
          {isClosed ? 'Open Trades' : 'Closed Trades'}
        </button>
      </section>

      {/* ✅ Trades Section */}
      <section aria-labelledby="trades-heading">
        <h2 id="trades-heading" className="visually-hidden">
          Trades List
        </h2>

        <AllTrades
          handleTradeId={handleTradeId}
          setUpdateModal={setUpdateModal}
          setCloseModal={setCloseModal}
          showTrades={showTrades}
        />
      </section>

      {/* ✅ Modals (can also wrap in aside) */}
      <aside aria-label="Trade Modals">
        {modal && <CreateTradeModal setModal={setModal} />}

        {updateModal && (
          <UpdateTradeModal
            tradeId={tradeId}
            setUpdateModal={setUpdateModal}
          />
        )}

        {closeModal && (
          <CloseTradeModal
            tradeId={tradeId}
            setCloseModal={setCloseModal}
          />
        )}
      </aside>

    </main>
  );
};

export default Dashboard;