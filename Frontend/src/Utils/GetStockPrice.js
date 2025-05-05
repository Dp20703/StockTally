import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetStockPrice = ({ stockSymbol }) => {
    const [stockPrice, setStockPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStockPrice = async (symbol) => {
        setLoading(true);
        console.log('');

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token not found. Please log in.');
            setLoading(false);
            return;
        }

        const url = `${process.env.REACT_APP_BACKEND_URL}/trades/price/${symbol}`;
        console.log("URL:", url);

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response for get price API:", response.data.price);
            if (response.status === 200) {
                setStockPrice(response.data.price);
            } else {
                console.log('Failed to fetch stock price.');
            }
        } catch (err) {
            console.error('Error fetching stock price:', err);
            console.log('Failed to fetch stock price.');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (stockSymbol) {
            fetchStockPrice(stockSymbol);
        }
    }, [stockSymbol]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {stockPrice ? (
                        <div>₹{stockPrice}</div>
                    ) : (
                        <div>No price available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetStockPrice;
