import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTrades } from '../../context/TradeContext'


const UpdateTrade = ({ setUpdateModal, tradeId }) => {
    const navigate = useNavigate();
    const { fetchTrades } = useTrades();
    const [tradeData, setTradeData] = useState([])

    const fetchData = async () => {
        const trade = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trades/get_trade/${tradeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setTradeData(trade.data.trade[0]);
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTradeData({ ...tradeData, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('TradeData:', tradeData);
        try {
            const newTrade = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/trades/update/${tradeId}`, tradeData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (newTrade.status === 200) {
                toast.success("Trade updated successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/trade/dashboard')
                    }
                })
            }
            else {
                toast.error("Unexpected error occurred while updating trade.", {
                    position: "top-right",
                    autoClose: 1000,
                });
                setUpdateModal(false);
            }

            setTradeData({
                stockName: '',
                stockSymbol: '',
                quantity: '',
                originalQuantity: '',
                entryType: ['buy', 'sell'],
                type: ['long', 'short'],
                buyPrice: '',
                sellPrice: '',
                buyDate: '',
                sellDate: '',
            })
            setUpdateModal(false);

        } catch (error) {
            if (!error.response.data.success) {
                console.error("Update failed:", error);
                toast.error(error.response.data.message || "Failed to update trade.", {
                    position: "top-right",
                    autoClose: 1500,
                });
                setUpdateModal(false);
            }

            setTradeData({
                stockName: '',
                stockSymbol: '',
                quantity: '',
                originalQuantity: '',
                entryType: ['buy', 'sell'],
                type: ['long', 'short'],
                buyPrice: '',
                sellPrice: '',
                buyDate: '',
                sellDate: '',
            })
        }
        finally {
            fetchTrades();
        }
    }


    return (
        <>
            <div>
                <form >
                    <h2 className='text-center'>Enter Trade Update Details</h2>
                    <hr />
                    {tradeData.status === 'closed' ? (
                    <div className='py-5'>
                        <h2 className='text-center text-bg-danger rounded'>Trade Already Closed and cannot be updated</h2>
                    </div>
                    ) : (
                        <div>
                            <div className='d-flex gap-2 justify-content-center align-content-center w-100 z-3'>

                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Name</label>
                                    <input type="text" name='stockName' value={tradeData?.stockName} onChange={handleChange} placeholder='enter stock name' className='form-control' />
                                </div>

                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Symbol</label>
                                    <input type="text" name='stockSymbol' value={tradeData?.stockSymbol} onChange={handleChange} placeholder='ex. KRN' className='form-control' />
                                </div>
                            </div>

                            <div className='d-flex gap-2 justify-content-center align-content-center w-100'>

                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Buy Price</label>
                                    <input type="number" value={tradeData?.buyPrice} onChange={handleChange} min={1} name='buyPrice' placeholder='enter stock buy price' className='form-control'
                                        disabled={!tradeData.buyPrice} />
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Sell Price</label>
                                    <input type="number" value={tradeData?.sellPrice} onChange={handleChange} min={1} name='sellPrice' placeholder='enter stock sell price' className='form-control'
                                        disabled={!tradeData.sellPrice} />
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Quantity</label>
                                    <input type="number" value={tradeData?.quantity} onChange={handleChange} min={1} name='quantity' placeholder='enter stock quantity' className='form-control' />
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Stock Original Quantity</label>
                                    <input type="number" value={tradeData?.originalQuantity} onChange={handleChange} min={1} name='originalQuantity' placeholder='enter stock original quantity' className='form-control' />
                                </div>

                            </div>

                            <div className='d-flex gap-2 justify-content-center align-content-center w-100'>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter entryType</label>
                                    < select className='form-control' value={tradeData?.entryType} onChange={handleChange} name="entryType" id="">
                                        <option value=''>Select entryType</option>
                                        <option value='buy'>Buy</option>
                                        <option value='sell'>Sell</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Type of Position</label>
                                    < select value={tradeData?.type} onChange={handleChange} className='form-control' name="type" id="">
                                        <option value=''>Select Type</option>
                                        <option value="long">Long</option>
                                        <option value="short">Short</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Buy Date</label>
                                    <input type="date" min={1} value={(tradeData?.buyDate || "").slice(0, 10)} onChange={handleChange} name='buyDate' placeholder='enter buy date' className='form-control' disabled={!tradeData.buyDate} />
                                </div>
                                <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                                    <label>Enter Sell Date</label>
                                    <input type="date" min={1} value={(tradeData?.sellDate || "").slice(0, 10)} onChange={handleChange} name='sellDate' placeholder='enter sell date' className='form-control' disabled={!tradeData.sellDate} />
                                </div>
                            </div>

                            <div className="w-25 mt-2 m-auto">
                                <button type="Submit" onClick={submitHandler} className='btn btn-primary w-100'>Submit</button>
                            </div>
                        </div>
                    )
                    }
                </form >
            </div >
        </>
    )
}

export default UpdateTrade