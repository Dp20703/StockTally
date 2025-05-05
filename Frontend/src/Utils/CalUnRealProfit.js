const CalUnRealProfit = ({ stockPrice, quantity, buyPrice, sellPrice }) => {
    console.log("stockPrice:", stockPrice, "quantity:", quantity, "buyPrice:", buyPrice, "sellPrice:", sellPrice);

    if (stockPrice == null || quantity == null || (buyPrice == null && sellPrice == null)) {
        return <div>-</div>; // Or show "N/A", "Waiting for data", etc.
    }

    const priceBasis = buyPrice != null ? buyPrice : sellPrice;
    console.log(("Price basis:", priceBasis));
    const unrealizedProfit = (stockPrice - priceBasis) * quantity;
    console.log("Unrealized profit:", unrealizedProfit);

    return <div>{unrealizedProfit.toFixed(2)}</div>; // Rounded for display
};

export default CalUnRealProfit;