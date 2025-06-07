import { useEffect, useRef, useState } from 'react';

const TradingViewNewsWidget = () => {
    const containerRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";
        setError(false); // reset error state

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.type = "text/javascript";
        script.async = true;
        script.text = JSON.stringify({
            feedMode: "all_symbols",
            isTransparent: true,
            displayMode: "adaptive",
            width: "100%",
            height: "500",
            colorTheme: "dark",
            locale: "en"
        });

        // Handle successful load
        script.onload = () => {
            console.log("TradingView script loaded successfully.");
        };

        // Handle errors on loading
        script.onerror = () => {
            console.error("Failed to load TradingView script.");
            setError(true);
        };

        containerRef.current.appendChild(script);
    }, []);

    if (error) {
        return (
            <div
                style={{
                    height: "500px",
                    width: "100%",
                    backgroundColor: "#222",
                    color: "#f44336",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                Failed to load TradingView news widget.
            </div>
        );
    }

    return (
        <div
            id="dashboard"
            className="tradingview-widget-container"
            ref={containerRef}
            style={{
                height: "500px",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <div className="tradingview-widget-container__widget" />
        </div>
    );
};

export default TradingViewNewsWidget;
