import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddStockModal from '../../components/watchlistCompo/AddStockModal';
import AddStock from './AddStock';

const UpdateWatchlist = ({ setUpdateModal, watchlistId }) => {
    console.log("Watchlist Id:", watchlistId);

    const [updateWatchlist, setUpdateWatchlist] = useState({});
    const [addStockModal, setAddStockModal] = useState(false);

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
            <div>
                <h1 className='text-center fs-2'>Update Watchlist</h1>
            </div>
            <div>
                <Form className='border border-secondary rounded-3 p-3 mt-3'>
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Enter watchlist name</Form.Label>
                        <Form.Control type="text" placeholder="Enter watchlist name" onChange={handleChange} value={updateWatchlist.watchlistName || ''} name='watchlistName' />
                    </Form.Group>

                    {
                        updateWatchlist.stocks == 0 ? (
                            <div className='d-flex justify-content-around align-items-center py-2'>
                                <p className='text-danger fw-bold'>No stocks added</p>
                                <Button className='float-end btn btn-primary' onClick={() => {
                                    setAddStockModal(true)
                                    // setUpdateModal(false)
                                }
                                }>Add stocks</Button>
                            </div>
                        ) :
                            (
                                <>
                                    <Form.Group className="mb-3" controlId="formBasicInput">
                                        {
                                            updateWatchlist.stocks?.map((stock, idx) => {
                                                return <div key={idx} className='mb-2'>
                                                    <Form.Label>Enter stock name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter stock name" onChange={(e) => handleStockChange(e, idx)} value={stock.stockName || ''} name='stockName' />
                                                </div>
                                            })
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicInput">
                                        {
                                            updateWatchlist.stocks?.map((stock, idx) => {
                                                return <div key={idx} className='mb-2'>
                                                    <Form.Label>Enter Stock symbol</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter stock symbol" onChange={(e) => handleStockChange(e, idx)} value={stock.stockSymbol || ''} name='stockSymbol' />
                                                </div>
                                            })
                                        }
                                    </Form.Group>
                                </>
                            )
                    }
                    <Button type='sumbit' variant="success" className='d-block m-auto' onClick={handleSubmit}>
                        Update Watchlist
                    </Button>
                </Form >
            </div >
            <div>
                {
                    addStockModal && <AddStock watchlistId={watchlistId} setAddStockModal={setAddStockModal} />
                }
            </div>
        </>
    )
}

export default UpdateWatchlist