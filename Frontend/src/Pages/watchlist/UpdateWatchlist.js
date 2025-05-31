import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddStock from './AddStock';
import { deleteStock } from '../../components/watchlistCompo/DeleteStock';
import { useWatchlists } from '../../context/WatchlistContext';

const UpdateWatchlist = ({ setUpdateModal, watchlistId }) => {
    console.log("Watchlist Id:", watchlistId);

    const [updateWatchlist, setUpdateWatchlist] = useState({});
    const [addStockModal, setAddStockModal] = useState(false);
    const { fetchWatchlist } = useWatchlists();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateWatchlist({ ...updateWatchlist, [name]: value });
    };

    const handleStockChange = (e, index) => {
        const { name, value } = e.target;
        const updatedStocks = [...updateWatchlist.stocks];
        updatedStocks[index] = { ...updatedStocks[index], [name]: value };
        setUpdateWatchlist({ ...updateWatchlist, stocks: updatedStocks });
    };

    useEffect(() => {
        const FetchWatchlist = () => {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/watchlist/get/${watchlistId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                setUpdateWatchlist(res.data);
            }).catch(err => {
                console.log("err:", err)
                toast.error("Failed to fetch watchlist", {
                    position: "top-right",
                    autoClose: 1000
                })
            }
            )
        }
        FetchWatchlist()
    }, [])
    const handleDeleteStock = (stockId) => {
        deleteStock(stockId, watchlistId)
        fetchWatchlist();
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_BACKEND_URL}/watchlist/update/${watchlistId}`, {
            watchlistName: updateWatchlist.watchlistName,
            stocks: updateWatchlist.stocks.map(stock => ({
                stockName: stock.stockName,
                stockSymbol: stock.stockSymbol,
                stockId: stock._id
            }))
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            () => {
                toast.success("Watchlist updated successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        setUpdateModal(false);
                    }
                })
                setUpdateWatchlist({});
                setUpdateModal(false);
                fetchWatchlist();
            }
        )
            .catch((err) => {
                console.log("err:", err)
                toast.error("Failed to update watchlist", {
                    position: "top-right",
                    autoClose: 1000
                })
                setUpdateModal(false);
            })
    }
    
    return (
        <>
            <div style={{ maxHeight: '100vh' }}>
                <div>
                    <h1 className='text-center fs-2'>Update Watchlist</h1>
                </div>
                <div>
                    <Form className='border border-secondary rounded-3 p-3 mt-3'>
                        <div style={{ overflowY: 'scroll', maxHeight: '60vh' }}>
                            <Form.Group className="mb-3 mx-3" controlId="formBasicInput">
                                <Form.Label>Enter watchlist name</Form.Label>
                                <Form.Control type="text" placeholder="Enter watchlist name" onChange={handleChange} value={updateWatchlist.watchlistName || ''} name='watchlistName' />
                            </Form.Group>

                            {
                                updateWatchlist.stocks == 0 ? (
                                    <p className='text-center text-danger fw-bold mx-3'>No stocks added</p>
                                ) :
                                    (
                                        <>
                                            <Form.Group className="mb-3" controlId="formBasicInput">
                                                {
                                                    updateWatchlist.stocks?.map((stock, idx) => (
                                                        <div key={idx} className='mb-4 border rounded p-3 shadow-sm mx-3'>
                                                            <div className='d-flex align-items-center justify-content-between pb-2'>
                                                                <Form.Label className="fw-bold">Stock #{idx + 1}</Form.Label>
                                                                <i className="ri-delete-bin-6-fill fs-5 text-dark bg-light rounded-circle px-1 " onClick={() => handleDeleteStock(stock._id)} />
                                                            </div>

                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter stock name"
                                                                onChange={(e) => handleStockChange(e, idx)}
                                                                value={stock.stockName || ''}
                                                                name='stockName'
                                                                className='mb-2'
                                                            />

                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter stock symbol"
                                                                onChange={(e) => handleStockChange(e, idx)}
                                                                value={stock.stockSymbol || ''}
                                                                name='stockSymbol'
                                                            />

                                                        </div>
                                                    ))
                                                }
                                            </Form.Group>
                                        </>
                                    )
                            }
                        </div>
                        <div className='d-flex justify-content-center align-items-center gap-5 mt-5'>
                            <Button type='sumbit' variant="success" onClick={handleSubmit}>
                                Update Watchlist
                            </Button>
                            <Button variant='primary' onClick={() => {
                                setAddStockModal(true)
                            }
                            }>Add stocks</Button>
                        </div>
                    </Form >
                </div >

                {
                    addStockModal && <AddStock watchlistId={watchlistId} setAddStockModal={setAddStockModal} setUpdateModal={setUpdateModal} />
                }
            </div>
        </>
    )
}

export default UpdateWatchlist