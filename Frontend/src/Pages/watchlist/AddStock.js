import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useWatchlists } from "../../context/WatchlistContext";
const AddStock = ({ setAddStockModal, watchlistId, setUpdateModal }) => {
    const [stocks, setStocks] = useState([{ stockName: '', stockSymbol: '' }]);
    const { fetchWatchlist } = useWatchlists();


    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedStocks = [...stocks];
        updatedStocks[index][name] = value;
        setStocks(updatedStocks);
    };


    const handleAddStock = () => {
        setStocks([...stocks, { stockName: '', stockSymbol: '' }]);
    };

    const handleRemoveStock = (index) => {
        const updatedStocks = stocks.filter((_, i) => i !== index);
        setStocks(updatedStocks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Stocks:", stocks);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/watchlist/add`, {
            stocks, watchlistId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            () => {
                toast.success("Stocks Added successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        setAddStockModal(false);
                    }
                })
                setUpdateModal(false);
                fetchWatchlist();
            }
        )
            .catch((err) => {
                if (err.response.status === 500) {
                    toast.error(err.response.data.details
                        || 'Maximum stocks limit 10 reached', {
                        position: "top-right",
                        autoClose: 1000
                    })
                }
                else {
                    console.log("err:", err)
                    toast.error("Failed to add stocks", {
                        position: "top-right",
                        autoClose: 1000
                    })
                }
                setAddStockModal(false);
            })
    };

    return (
        <div id='addStock'>
            <div className='  border border-secondary rounded-3 p-3' style={{ height: 'fit-content' }}>
                <div>
                    <Form className="mx-auto mt-4" style={{ maxWidth: '80%' }}>
                        <h3 className="text-center mb-4">Add Stocks
                            <span className="close fs-2 text-light"
                                onClick={() => setAddStockModal(false)} >
                                &times;
                            </span></h3>

                        <div className='hide-scrollbar' style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                            {stocks?.map((stock, index) => (
                                <div key={index} className="bg-light p-3 mb-3 border rounded shadow-sm position-relative">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleRemoveStock(index)}
                                        className="position-absolute top-0 end-0 m-2"
                                    >
                                        ✕
                                    </Button>
                                    <h5 className="text-muted">Stock {index + 1}</h5>
                                    <Form.Group className="mb-2">
                                        <Form.Label className='text-muted'>Stock Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter stock name"
                                            name="stockName"
                                            value={stock.stockName}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className='text-muted'>Stock Symbol</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter stock symbol"
                                            name="stockSymbol"
                                            value={stock.stockSymbol}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </Form.Group>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline-primary" className="w-100 mb-3 mt-3" onClick={handleAddStock}>
                            + Add Another Stock
                        </Button>

                        <Button type="submit" variant="success" className="w-100" onClick={handleSubmit}>
                            Submit All Stocks
                        </Button>
                    </Form>


                </div>
            </div >
        </div >

    )
}

export default AddStock