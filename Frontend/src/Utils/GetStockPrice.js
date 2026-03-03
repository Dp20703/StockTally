import { useEffect, useState } from 'react';
import CalUnRealProfit from './CalUnRealProfit';
import Loader from './Loader';
import api from '../Services/apiClient';

const GetStockPrice = ({ stockSymbol, quantity, buyPrice, sellPrice }) => {
    const [stockPrice, setStockPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch stock price
        const fetchStockPrice = async () => {

            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/trades/price/${stockSymbol}`);

                if (response.status === 200) {
                    setStockPrice(response?.data?.price);
                }

            } catch (err) {
                return err
            }
            setLoading(false);
        };

        fetchStockPrice();
    }, [stockSymbol]);

    return (
        <>
            {loading ?
                (<div><Loader type="dot" /></div>)
                : stockPrice ? (
                    <div className='d-flex justify-content-center  align-items-center gap-3'>
                        <div>
                            <strong>Stock Price:</strong>₹{stockPrice}</div>
                        <div>
                            <div>
                                <strong>Unrealized Profit:</strong>
                                <CalUnRealProfit
                                    stockPrice={stockPrice}
                                    quantity={quantity}
                                    buyPrice={buyPrice}
                                    sellPrice={sellPrice}
                                /></div>
                        </div>
                    </div>
                ) : (
                    <div>No price available</div>
                )}
        </>
    );
};

export default GetStockPrice;
