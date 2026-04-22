import { useCallback, useEffect, useState } from 'react';
import CalUnRealProfit from './CalUnRealProfit';
import api from 'services/apiClient';
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
    }, [fetchStockPrice]);

    if (loading) return <DotLoader />;

    if (error) return <span className="text-xs text-text-muted">Failed to fetch</span>;

    if (!stockPrice) return <span className="text-xs text-text-muted">N/A</span>;

    const isProfit = stockPrice > buyPrice;
    return (
        buyPrice === 0 ? (
            <span className="st-mono text-text-primary">
                ₹ {stockPrice}
            </span>
        ) : (
            <div className="flex items-center gap-2.5">

                <div className="flex flex-col gap-0.5">
                    <span className="text-2xs uppercase tracking-wider text-text-hint">
                        Current
                    </span>
                    <span className={`st-mono ${isProfit ? 'st-profit' : 'st-loss'}`}>
                        ₹ {stockPrice}
                    </span>
                </div>

                <div className="w-px h-7 bg-bg-border" />

                <div className="flex flex-col gap-0.5">
                    <span className="text-2xs uppercase tracking-wider text-text-hint">
                        Unrealized
                    </span>
                    <CalUnRealProfit
                        stockPrice={stockPrice}
                        quantity={quantity}
                        buyPrice={buyPrice}
                        sellPrice={sellPrice}
                    />
                </div>

            </div>
        )
    );
};

export default GetStockPrice;