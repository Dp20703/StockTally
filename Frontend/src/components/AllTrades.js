import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UpdateTradeModal from './UpdateTradeModal';


const AllTrades = ({ setUpdateModal, handleTradeId, setCloseModal }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const fetchData = async () => {
        const allTrades = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trades/get_all_trades`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log("User all trades details:", allTrades.data);
        setData(allTrades.data.trades);
    }
    console.log("allTrades data:", data);
    useEffect(() => {
        fetchData()
    }, [])
    const handleDeleteSuccess = (tradeId) => {
        // Update the state after a trade is deleted
        const updatedTrades = data.filter(trade => trade._id !== tradeId);
        setData(updatedTrades);
    };

    const deleteTrade = (tradeId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/trades/delete/${tradeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            console.log("Trade Deleted Successfully")
            toast.success("Trade Deleted Successfully", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/trade/dashboard');
                    handleDeleteSuccess(tradeId)
                }
            })
        }).catch((err) => {
            console.log("Error while deleting trade:", err);
            toast.error("Failed to delete a trade",
                {
                    position: "top-right",
                    autoClose: 1500,
                }
            )
        })
    }

    return (
        <>
            <div className="container mt-5" id="allTrades">
                <h1 className='text-center'>All Trades Deatails</h1>
                <div>
                    <table className='table table-bordered table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Stock Name</th>
                                <th>Stock Symbol</th>
                                <th>Buy Price</th>
                                <th>Buy Date</th>
                                <th>Sell Price</th>
                                <th>Sell Date</th>
                                <th>Quantity</th>
                                <th>Original Quantity</th>
                                <th>Type</th>
                                <th>EntryType</th>
                                <th>profit</th>
                                <th>Final Profit</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>close</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((trade, index) => {
                                    return (
                                        <tr key={trade._id}>
                                            <td>{index + 1}</td>
                                            <td>{trade.stockName}</td>
                                            <td>{trade.stockSymbol}</td>
                                            <td>{trade.buyPrice}</td>
                                            <td>{trade.buyDate?.split('T')[0]}</td>
                                            <td>{trade.sellPrice}</td>
                                            <td>{trade.sellDate?.split('T')[0]}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{trade.originalQuantity}</td>
                                            <td>{trade.type}</td>
                                            <td>{trade.entryType}</td>
                                            <td>{trade.profit}</td>
                                            <td>{trade.finalProfit}</td>
                                            <td className={trade.status === 'open' ? 'text-bg-success' : 'text-bg-danger'}>{trade.status}</td>

                                            <td>
                                                <button className='btn btn-warning'
                                                    onClick={() => {
                                                        handleTradeId(trade._id);
                                                        setUpdateModal(true);
                                                    }
                                                    }>Update</button>
                                            </td>

                                            <td> <button className='btn btn-dark'
                                                onClick={() => {
                                                    handleTradeId(trade._id);
                                                    setCloseModal(true);
                                                }
                                                }>Close</button></td>

                                            <td><button className='btn btn-danger' onClick={() => {
                                                deleteTrade(trade._id)
                                            }}>Delete</button></td>

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