import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef(null);

    useEffect(() => {
        container.current.innerHTML = "";
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            allow_symbol_change: true,
            support_host: "https://www.tradingview.com"
        });

        container.current.appendChild(script);
    }, []);

    return (
        <div className='overflow-hidden'>
            <div style={{ height: "100dvh", width: "100%", overflow: "hidden" }}>
                <div
                    className="tradingview-widget-container overflow-hidden"
                    ref={container}
                    style={{ height: "100%", width: "100%" }}
                >
                    <div
                        className="tradingview-widget-container__widget"
                        style={{ height: "100%", width: "100%" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
