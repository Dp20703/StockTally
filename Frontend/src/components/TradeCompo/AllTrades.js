import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../../context/TradeContext';
import { deleteTrade } from './DeleteTrade';
import Swal from 'sweetalert2';
import TradesTable from './TradesTable';

const AllTrades = ({ setUpdateModal, handleTradeId, setCloseModal, showTrades }) => {
    const { trades, fetchTrades } = useTrades();
    const navigate = useNavigate();
    const tradesToDisplay = trades.filter(trade => trade.status === showTrades);
    console.log("tradesToDisplay:", tradesToDisplay);
    // Delete Trade
    const handleDelete = (tradeId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This trade will be permanently deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTrade(tradeId, navigate);
                Swal.fire('Deleted!', 'The trade has been deleted.', 'success');
            }
            fetchTrades();
        });
    };

    // Fetch all trades
    useEffect(() => {
        fetchTrades()
    }, [])
    const captalizeFirstLetter = (string) => {
        if (!string) return '';
        return string?.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <>
            <div className="px-4 overflow-hidden mt-3" id="allTrades">
                <h1 className='text-center text-light rounded mb-3'>{captalizeFirstLetter(showTrades)} Trades Details</h1>
                <TradesTable trades={tradesToDisplay} handleTradeId={handleTradeId} setUpdateModal={setUpdateModal} setCloseModal={setCloseModal} handleDelete={handleDelete} showTrades={showTrades} />
            </div>
        </>
    )
}

export default AllTrades