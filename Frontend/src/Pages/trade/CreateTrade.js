import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTrades } from '../../context/TradeContext';
import api from '../../Services/apiClient';


const CreateTrade = ({ setModal }) => {

    const { fetchTrades } = useTrades();
    const navigate = useNavigate();
    const [tradeData, setTradeData] = useState({
        stockName: '',
        stockSymbol: '',
        originalQuantity: '',
        entryType: '',
        type: '',
        price: '',
        date: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTradeData({ ...tradeData, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await api.post("/trades/create", tradeData);

            toast.success("Create Trade successfully", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    fetchTrades();
                    navigate('/trade/dashboard');
                }
            })

            setTradeData({
                stockName: '',
                stockSymbol: '',
                originalQuantity: '',
                entryType: ['buy', 'sell'],
                type: ['long', 'short'],
                price: '',
                date: '',
            })

            setModal(false);

        } catch (error) {

            if (error.response) {
                if (error.response.status === 400) {
                    toast.error("Please fill in all required fields.");
                }
            }
            else {
                toast.error("An unexpected error occurred. Try again later.");
                toast.error("create Trade Failed", {
                    position: "top-right",
                    autoClose: 1500,
                });
            }

            setTradeData({
                stockName: '',
                stockSymbol: '',
                originalQuantity: '',
                entryType: ['buy', 'sell'],
                type: ['long', 'short'],
                price: '',
                date: '',
            })
        }
    }


    return (
        <>
            <div>
                <form >
                    <h2>Enter Trade Details</h2>
                    <hr />

                    <div className='d-flex gap-2 justify-content-center align-content-center w-100'>

                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Stock Name</label>
                            <input type="text" name='stockName' value={tradeData.stockName} onChange={handleChange} placeholder='enter stock name' className='form-control' />
                        </div>

                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Stock Symbol</label>
                            <input type="text" name='stockSymbol' value={tradeData.stockSymbol} onChange={handleChange} placeholder='ex. KRN' className='form-control' />
                        </div>
                    </div>

                    <div className='d-flex gap-2 justify-content-center align-content-center w-100'>

                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Stock Price</label>
                            <input type="number" value={tradeData.price} onChange={handleChange} min={1} name='price' placeholder='enter stock price' className='form-control' />
                        </div>
                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Stock Quantity</label>
                            <input type="number" value={tradeData.originalQuantity} onChange={handleChange} min={1} name='originalQuantity' placeholder='enter stock quantity' className='form-control' />
                        </div>

                    </div>

                    <div className='d-flex gap-2 justify-content-center align-content-center w-100'>
                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter entryType</label>
                            < select className='form-control' value={tradeData.entryType} onChange={handleChange} name="entryType" id="">
                                <option value=''>Select entryType</option>
                                <option value='buy'>Buy</option>
                                <option value='sell'>Sell</option>
                            </select>
                        </div>
                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Type of Position</label>
                            < select value={tradeData.type} onChange={handleChange} className='form-control' name="type" id="">
                                <option value=''>Select Type</option>
                                <option value="long">Long</option>
                                <option value="short">Short</option>
                            </select>
                        </div>
                        <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                            <label>Enter Date</label>
                            <input type="date" min={1} value={tradeData.date} onChange={handleChange} name='date' placeholder='enter date' className='form-control' />
                        </div>
                    </div>

                    <div className="w-25 mt-2 m-auto">
                        <button type="Submit" onClick={submitHandler} className='btn btn-primary w-100'>Submit</button>
                    </div>
                </form >
            </div >
        </>
    )
}

export default CreateTrade