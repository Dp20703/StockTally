import { useEffect, useState } from "react";

const CalUnRealProfit = ({ stockPrice, quantity, buyPrice, sellPrice }) => {
    const [profit, setProfit] = useState(null);

    useEffect(() => {
        const stockValue = typeof stockPrice === 'object' && stockPrice !== null
            ? Number(stockPrice.value)
            : Number(stockPrice);

        const qty = Number(quantity);
        const priceBasis = buyPrice != null ? Number(buyPrice) : Number(sellPrice);
        const isValid = !isNaN(stockValue) && !isNaN(qty) && !isNaN(priceBasis);

        if (isValid) {
            const unrealizedProfit = (stockValue - priceBasis) * qty;
            setProfit(unrealizedProfit);
        } else {
            setProfit(null);
        }
    }, [stockPrice, quantity, buyPrice, sellPrice]);

    // return <span>{profit != null ? `₹${profit.toFixed(2)}` : "-"}</span>;
    return <span>{profit != null ? <span style={{ color: profit < 0 ? 'red' : 'green' }}>
        ₹{profit.toFixed(2)}
    </span> : "-"}</span>;
};

export default CalUnRealProfit;
