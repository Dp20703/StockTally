import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CloseTrade = ({ setCloseModal, tradeId }) => {
  const navigate = useNavigate();
  const [tradeData, setTradeData] = useState([])
  const [closeData, setCloseData] = useState({
    closePrice: '',
    closeDate: '',
    closeQuantity: ''
  })
  const fetchData = async () => {
    const trade = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trades/get_trade/${tradeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTradeData(trade.data.trade[0]);
  }
  useEffect(() => {
    fetchData()
  }, [])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCloseData({ ...closeData, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const trade = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trades/close/${tradeId}`, closeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Check if the response status is 200
      if (trade.status === 200) {
        toast.success("Trade Closed successfully", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate('/trade/dashboard');
            window.location.reload();
          }
        });
      } else {
        toast.error("Unexpected error occurred while closing trade.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setCloseData({
        closePrice: '',
        closeDate: '',
        closeQuantity: ''
      });
      setCloseModal(false);
    } catch (error) {
      // Handle different error responses
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.message || "Please fill in all required fields.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          case 405:
            toast.error(error.response.data.message || "Close Quantity should be less than Current Quantity.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          case 406:
            toast.error(error.response.data.message || "Trade is already closed.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          case 401:
            toast.error("Unauthorized. Please login again.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          case 404:
            toast.error("Trade not found. Please verify the trade ID.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          case 500:
            toast.error("Internal Server Error. Please try again later.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
          default:
            toast.error(error.response.data.message || "Failed to Close trade. Please try again.", {
              position: "top-right",
              autoClose: 1000,
            });
            break;
        }
      } else {
        // Handle cases where there is no response (e.g., network issues)
        toast.error("Failed to Close trade due to unknown error.", {
          position: "top-right",
          autoClose: 1000,
        });
      }

      console.error("Close Trade failed:", error);
      setCloseData({
        closePrice: '',
        closeDate: '',
        closeQuantity: ''
      });
    }
  };

  return (
    <>
      <div >
        <form>
          <h2 className='text-center'>Enter Trade Close Details</h2>
          <hr />
          <h5 className='text-success'>Open Trade</h5>
          <hr />
          <div className="open-trade">
            <div className='d-flex gap-2 justify-content-center align-content-center w-100 z-3'>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Stock Name</label>
                <input readOnly type="text" name='stockName' value={tradeData?.stockName} onChange={handleChange} placeholder='  stock name' className='form-control' />
              </div>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label> Stock Symbol</label>
                <input readOnly type="text" name='stockSymbol' value={tradeData?.stockSymbol} onChange={handleChange} placeholder='ex. KRN' className='form-control' />
              </div>
              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Entry Type</label>
                < select disabled className='form-control' value={tradeData?.entryType} onChange={handleChange} name="entryType" id="">
                  <option value=''>Select entryType</option>
                  <option value='buy'>Buy</option>
                  <option value='sell'>Sell</option>
                </select>
              </div>
              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Type of Position</label>
                < select disabled value={tradeData?.type} onChange={handleChange} className='form-control' name="type" id="">
                  <option value=''>Select Type</option>
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
              </div>


            </div>
            <div className='d-flex gap-2 justify-content-center align-content-center w-100'>
              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Stock Buy Price</label>
                <input readOnly type="number" value={tradeData?.buyPrice} onChange={handleChange} min={1} name='buyPrice' placeholder='  stock buy price' className='form-control' />

              </div>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Buy Date</label>
                <input readOnly type="date" value={(tradeData?.buyDate || "").slice(0, 10)} onChange={handleChange} name='buyDate' placeholder='  buy date' className='form-control' />
              </div>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Stock Original Quantity</label>
                <input readOnly type="number" value={tradeData?.originalQuantity} onChange={handleChange} min={1} name='originalQuantity' placeholder='  stock original quantity' className='form-control' />
              </div>

            </div>
            <div className='d-flex gap-2 justify-content-center align-content-center w-100'>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Stock Sell Price</label>
                <input readOnly type="number" value={tradeData?.sellPrice} onChange={handleChange} min={1} name='sellPrice' placeholder='  stock sell price' className='form-control' />
              </div>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Sell Date</label>
                <input readOnly type="date" value={(tradeData?.sellDate || "").slice(0, 10)} onChange={handleChange} name='sellDate' placeholder='  sell date' className='form-control' />
              </div>

              <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                <label>  Stock Quantity</label>
                <input readOnly type="number" value={tradeData?.quantity} onChange={handleChange} min={1} name='quantity' placeholder='  stock quantity' className='form-control' />
              </div>

            </div>
          </div>
          <hr />
          {tradeData.status === 'closed' ? (
            <h2 className='text-center text-bg-danger'>Trade Already Closed</h2>
          ) : (
            <>
              <h5 className='text-danger mt-2'>Close Trade</h5>
              <hr />
              <div className="close-trade">
                <div className='d-flex gap-2 justify-content-center align-content-center w-100'>

                  <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                    <label>Enter Stock Close Price</label>
                    <input
                      type="number"
                      value={closeData.closePrice}
                      onChange={handleChange}
                      min={1}
                      name='closePrice'
                      placeholder='enter stock close price'
                      className='form-control'
                    />
                  </div>

                  <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                    <label>Enter Close Date</label>
                    <input
                      type="date"
                      value={closeData.closeDate}
                      onChange={handleChange}
                      name='closeDate'
                      placeholder='enter close date'
                      className='form-control'
                    />
                  </div>

                  <div className="form-group mb-2 w-50 d-flex flex-column justify-content-center align-items-start gap-2">
                    <label>Enter Stock Close Quantity</label>
                    <input
                      type="number"
                      value={closeData.closeQuantity}
                      onChange={handleChange}
                      min={1}
                      name='closeQuantity'
                      placeholder='enter stock close quantity'
                      className='form-control'
                    />
                  </div>

                </div>
              </div>

              <div className="w-25 mt-3 m-auto">
                <button type="submit" onClick={submitHandler} className='btn btn-primary w-100'>Submit</button>
              </div>
            </>
          )}

        </form >
      </div >
    </>
  )
}

export default CloseTrade