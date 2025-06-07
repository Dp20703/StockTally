import { useEffect, useRef, useState } from 'react';

const TradingViewNewsWidget = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.type = "text/javascript";
        script.async = true;
        script.text = JSON.stringify({
            "feedMode": "market",
            "market": "stock",
            "isTransparent": true,
            "displayMode": "adaptive",
            "width": "100%",
            "height": "800",
            "colorTheme": "dark",
            "locale": "en"
        });
        containerRef.current.appendChild(script);
    }, []);

    return (
        <div
            className="tradingview-widget-container"
            ref={containerRef}
            style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <div className="tradingview-widget-container__widget" />
        </div>
    );
};

export default TradingViewNewsWidget;
