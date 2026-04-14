import { useCallback, useEffect, useState } from 'react';
import CalUnRealProfit from './CalUnRealProfit';
import api from '../services/apiClient';
import { DotLoader } from '../components/ui';


const GetStockPrice = ({ stockSymbol, quantity = 0, buyPrice = 0, sellPrice = 0 }) => {
    const [stockPrice, setStockPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchStockPrice = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await api.get(`/trades/price/${stockSymbol}`);
            setStockPrice(response?.data?.price);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [stockSymbol]);

    useEffect(() => {
        fetchStockPrice();
    }, [fetchStockPrice])


    if (loading) return <DotLoader />;

    if (error) return <span style={styles.muted}>Failed to fetch</span>;

    if (!stockPrice) return <span style={styles.muted}>N/A</span>;

    return (
        buyPrice === 0 ? (
            <span style={styles.value}>₹ {stockPrice}</span>
        ) : (
            <div style={styles.wrapper}>
                <div style={styles.item}>
                    <span style={styles.label}>Current</span>
                    <span style={styles.value}>₹ {stockPrice}</span>
                </div>
                <div style={styles.divider} />
                <div style={styles.item}>
                    <span style={styles.label}>Unrealized</span>
                    <CalUnRealProfit
                        stockPrice={stockPrice}
                        quantity={quantity}
                        buyPrice={buyPrice}
                        sellPrice={sellPrice}
                    />
                </div>
            </div >
        )
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    label: {
        fontSize: 10,
        color: '#475569',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 13,
        color: '#f0fdf4',
        fontFamily: "'Courier New', monospace",
    },
    divider: {
        width: 1,
        height: 28,
        background: '#1e2d3d',
    },
    muted: {
        fontSize: 12,
        color: '#475569',
    },
};

export default GetStockPrice;
