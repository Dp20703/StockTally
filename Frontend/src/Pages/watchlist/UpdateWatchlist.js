import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateWatchlist = ({ setUpdateModal, watchlistId }) => {
    console.log("Watchlist Id:", watchlistId);
    const [updateWatchlist, setUpdateWatchlist] = useState({});

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
    console.log("Update Watchlist", updateWatchlist)

    useEffect(() => {
        const FetchWatchlist = () => {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/watchlist/get/${watchlistId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((res) => {
                console.log("data:", res.data);
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
                <h1 className='text-center'>Update Watchlist</h1>
            </div>
            <div>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Enter watchlist name</Form.Label>
                        <Form.Control type="text" placeholder="Enter watchlist name" onChange={handleChange} value={updateWatchlist.watchlistName || ''} name='watchlistName' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Enter stock name</Form.Label>
                        {
                            updateWatchlist.stocks?.map((stock, idx) => {
                                return <div key={idx} className='mb-2'>
                                    <Form.Control type="text" placeholder="Enter stock name" onChange={(e) => handleStockChange(e, idx)} value={stock.stockName || ''} name='stockName' />
                                </div>
                            })
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Enter Stock symbol</Form.Label>
                        {
                            updateWatchlist.stocks?.map((stock, idx) => {
                                return <div key={idx} className='mb-2'>
                                    <Form.Control type="text" placeholder="Enter stock symbol" onChange={(e) => handleStockChange(e, idx)} value={stock.stockSymbol || ''} name='stockSymbol' />
                                </div>
                            })
                        }
                    </Form.Group>

                    <Button type='sumbit' variant="success" className='d-block m-auto' onClick={handleSubmit}>
                        Update Watchlist
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default UpdateWatchlist