import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import GetStockPrice from '../Utils/GetStockPrice';
import { useTrades } from '../context/TradeContext';
import { deleteTrade } from './DeleteTrade';

const AllTrades = ({ setUpdateModal, handleTradeId, setCloseModal }) => {
    const { trades, fetchTrades } = useTrades();
    const navigate = useNavigate();

    // Delete Trade
    const handleDelete = (tradeId) => {
        deleteTrade(tradeId, navigate);
        fetchTrades()
    }

    // Fetch all trades
    useEffect(() => {
        fetchTrades()
    }, [])


    return (
        <>
            <div className="mx-3 overflow-hidden mt-3" id="allTrades">
                <h1 className='text-center text-light rounded mb-3'>All Trades Details</h1>
                <div className='table-responsive rounded-3 border border-light overflow-hidden mb-5'>
                    <table className='table table-bordered table-hover mb-0 table-dark ' >
                        <thead className='table-primary'>
                            <tr className='text-center'>
                                <th>No</th>
                                <th>Stock Name</th>
                                <th>Stock Symbol</th>
                                <th>Buy Price</th>
                                <th>Buy Date</th>
                                <th>Sell Price</th>
                                <th>Sell Date</th>
                                <th>Currrent Quantity</th>
                                <th>Original Quantity</th>
                                <th>Type</th>
                                <th>EntryType</th>
                                <th>Price & Profit</th>
                                <th>Profit</th>
                                <th>Final Profit</th>
                                <th>Status</th>
                                <th colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trades.map((trade, index) => {
                                    return (
                                        <tr key={trade._id} >
                                            <td>{index + 1}</td>
                                            <td>{trade.stockName}</td>
                                            <td>{trade.stockSymbol}</td>
                                            <td>₹ {trade.buyPrice}</td>
                                            <td>{trade.buyDate?.split('T')[0]}</td>
                                            <td>₹ {trade.sellPrice}</td>
                                            <td>{trade.sellDate?.split('T')[0]}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{trade.originalQuantity}</td>
                                            <td>{trade.type}</td>
                                            <td>{trade.entryType}</td>
                                            <td>
                                                <GetStockPrice
                                                    stockSymbol={trade.stockSymbol}
                                                    quantity={trade.quantity}
                                                    buyPrice={trade.buyPrice}
                                                    sellPrice={trade.sellPrice}
                                                />
                                            </td>

                                            <td>₹ <span style={{ color: trade.profit < 0 ? 'red' : 'green' }}>
                                                {trade.profit?.toFixed(2)}
                                            </span></td>
                                            <td>₹ <span style={{ color: trade.finalProfit < 0 ? 'red' : 'green' }}>
                                                {trade.finalProfit?.toFixed(2)}
                                            </span></td>
                                            <td className={trade.status === 'open' ? 'text-bg-success' : 'text-bg-danger'}>
                                                {trade.status}
                                            </td>

                                            <td>
                                                <button className='btn btn-warning'
                                                    onClick={() => {
                                                        handleTradeId(trade._id);
                                                        setUpdateModal(true);
                                                    }
                                                    }>Update</button>
                                            </td>

                                            <td>
                                                <button className='btn btn-light'
                                                    onClick={
                                                        () => {
                                                            handleTradeId(trade._id);
                                                            setCloseModal(true);
                                                        }
                                                    }>Close
                                                </button></td>

                                            <td>
                                                <button className='btn btn-danger' onClick={
                                                    () => {
                                                        handleDelete(trade._id)
                                                    }}>
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}

export default AllTrades