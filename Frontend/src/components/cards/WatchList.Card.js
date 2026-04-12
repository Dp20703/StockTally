import Table from 'react-bootstrap/Table';
import { deleteWatchlist } from '../watchlistCompo/DeleteWatchlist';
import { useWatchlists } from '../../context/WatchlistContext';

const WatchListCard = ({ setUpdateModal, setWatchlistId, idx, watchlist }) => {
    const { watchlists, fetchWatchlist } = useWatchlists();
    const handleDelete = (id) => {
        watchlists.filter(watchlist => watchlist._id !== id);
        deleteWatchlist(id);
        fetchWatchlist()
    }
    return (
        <div id='watchlistBox' className="text-bg-success rounded-2 overflow-hidden">

            <h2 id='watchlistTitle' className='text-bg-success mb-0 py-1'>
                <span className=' text-dark px-2'>{idx + 1}. </span>
                <span className='watchlistName'> {watchlist.watchlistName}</span>
                <span>
                    <i className="ri-delete-bin-6-line text-dark float-end icons" onClick={() => handleDelete(watchlist._id)} />
                    <i className="ri-edit-box-line  text-dark float-end icons" onClick={() => { setUpdateModal(true); setWatchlistId(watchlist._id) }} />
                </span>
            </h2>

            <div className='table-responsive w-100'>
                <Table responsive className='table mb-0 table-hover table-dark  table-bordered'>
                    <thead className='table-secondary'>
                        <tr>
                            <th>#</th>
                            <th>Stock name</th>
                            <th>Stock symbol</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            watchlist.stocks && watchlist.stocks.length > 0 ? (
                                watchlist.stocks.map((stock, idx) => {
                                    return <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{stock.stockName}</td>
                                        <td>{stock.stockSymbol}</td>
                                        <td>{stock.price}</td>
                                    </tr>
                                })
                            ) :
                                (
                                    <tr>
                                        <td colSpan={4} className="text-center text-bg-danger w-100">
                                            No stocks
                                        </td>
                                    </tr>
                                )
                        }

                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default WatchListCard