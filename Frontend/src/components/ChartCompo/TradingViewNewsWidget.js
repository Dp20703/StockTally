import { useEffect, useRef, useState } from 'react';

const TradingViewNewsWidget = () => {
    const containerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear existing content
        containerRef.current.innerHTML = `
            <div class="tradingview-widget-container__widget" style="height: 100%; width: 100%;"></div>
            <div class="tradingview-widget-copyright" style="text-align: center; margin-top: 8px;">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span class="blue-text">News by TradingView</span>
                </a>
            </div>
        `;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.type = "text/javascript";
        script.async = true;

        script.innerHTML = JSON.stringify({
            feedMode: "market",
            market: "stock",
            isTransparent: true,
            displayMode: "adaptive",
            width: "100%",
            height: "100%",
            colorTheme: "dark",
            locale: "en"
        });

        script.onload = () => setError(null);
        script.onerror = () => {
            console.error("TradingView news widget failed to load.");
            setError("Failed to load news. Please try again later.");
        };

        containerRef.current
            .querySelector(".tradingview-widget-container__widget")
            ?.appendChild(script);
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
            {error ? (
                <div style={{ color: "red", textAlign: "center", padding: "2rem", fontSize: "1.2rem" }}>
                    {error}
                </div>
            ) : (
                <div
                    className="tradingview-widget-container"
                    ref={containerRef}
                    style={{
                        height: "100%",
                        width: "100%",
                        overflow: "hidden"
                    }}
                />
            )}
        </div>
    );
};

export default TradingViewNewsWidget;
