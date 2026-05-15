
export const GetStockPrice = ({trade}) => {
  return (
   <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-text-muted">Live Price</p>
                      {trade?.currentMarketPrice ? (
                        <span className="st-mono text-text-primary">
                          ₹ {trade.currentMarketPrice}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">N/A</span>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-text-muted">Unrealized P&L</p>
                      {trade?.unrealizedPnL != null ? (
                        <span
                          className={`st-mono ${trade.unrealizedPnL >= 0 ? "st-profit" : "st-loss"}`}
                        >
                          {trade.unrealizedPnL >= 0 ? "+" : ""}₹{" "}
                          {trade.unrealizedPnL.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </div>
                  </div>
  )
}
