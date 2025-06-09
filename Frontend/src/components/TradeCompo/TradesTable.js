import GetStockPrice from '../../Utils/GetStockPrice';

const TradesTable = ({ trades, setUpdateModal, handleTradeId, setCloseModal, handleDelete, showTrades }) => {
    return (
        <div id='tradeTable' className='table-responsive rounded-2 border border-light overflow-x-auto'>
            <table className='table table-responsive table-bordered table-hover mb-0 table-dark ' >
                <thead className='table-primary'>
                    <tr className='text-center'>
                        <th>No</th>
                        <th>Stock Name</th>
                        <th>Stock Symbol</th>
                        <th>Buy Price</th>
                        <th>Buy Date</th>
                        <th>Sell Price</th>
                        <th>Sell Date</th>
                        {showTrades === 'open' && <th>Currrent Quantity</th>}
                        <th>Original Quantity</th>
                        <th>Type</th>
                        <th>EntryType</th>
                        <th>Price & Profit</th>
                        {showTrades === 'open' && <th>Current Profit</th>}
                        <th>Final Profit</th>
                        <th>Status</th>
                        <th colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trades.length === 0 ? (
                            <tr className='text-center '>
                                <td colSpan={16} className='py-3'>No trades found</td>
                            </tr>
                        ) : trades.map((trade, index) => {
                            return (
                                <tr key={trade._id} >
                                    <td>{index + 1}</td>
                                    <td>{trade.stockName}</td>
                                    <td>{trade.stockSymbol}</td>
                                    <td>₹ {trade.buyPrice}</td>
                                    <td>{trade.buyDate?.split('T')[0]}</td>
                                    <td>₹ {trade.sellPrice}</td>
                                    <td>{trade.sellDate?.split('T')[0]}</td>
                                    {showTrades === 'open' && <td>{trade.quantity}</td>}
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

                                    {
                                        trade.status === 'open' && (
                                            <td>₹ <span style={{ color: trade.profit < 0 ? 'red' : 'green' }}>
                                                {trade.profit?.toFixed(2)}
                                            </span></td>
                                        )
                                    }

                                    <td>₹ <span style={{ color: trade.finalProfit < 0 ? 'red' : 'green' }}>
                                        {trade.finalProfit?.toFixed(2)}
                                    </span></td>

                                    <td className={trade.status === 'open' ? 'text-bg-success' : 'text-bg-danger'}>
                                        {trade.status}
                                    </td>

                                    {
                                        trade.status === 'open' && (
                                            <>
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
                                                    </button>
                                                </td>
                                            </>
                                        )
                                    }

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
        </div >
    )
}

export default TradesTable