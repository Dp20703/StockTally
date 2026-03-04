import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
    root: {
        '--color-asphalt': '#111111',
        '--color-race-orange': '#FF4400',
        '--color-vintage-cream': '#F2E8DC',
        '--color-off-white': '#FFFFFF',
        '--border-weight': '6px',
    },
    body: {
        backgroundColor: '#111111',
        color: '#F2E8DC',
        fontFamily: "'Antonio', sans-serif",
        overflowX: 'hidden',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitFontSmoothing: 'antialiased',
    },

    heroContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1400px',
        padding: '2rem',
    },
    titleWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 0.8,
        transform: 'skewX(-2deg)',
    },
    wordStock: {
        fontSize: 'clamp(6rem, 25vw, 18rem)',
        fontWeight: 700,
        color: '#F2E8DC',
        letterSpacing: '-0.05em',
        zIndex: 1,
        fontStretch: 'ultra-condensed',
        transition: 'transform 0.1s ease-out',
    },
    wideO: {
        display: 'inline-block',
        fontFamily: "'Archivo Black', sans-serif",
        fontWeight: 400,
        transform: 'scaleX(1.1)',
        letterSpacing: '-0.02em',
    },
    wordTally: {
        fontSize: 'clamp(6rem, 25vw, 18rem)',
        fontWeight: 700,
        color: '#FF4400',
        letterSpacing: '-0.05em',
        marginTop: '-0.15em',
        zIndex: 2,
        position: 'relative',
        mixBlendMode: 'normal',
        transition: 'transform 0.1s ease-out',
    },
    wordTallySpan: {
        position: 'relative',
        display: 'inline-block',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    chartGlyph: {
        position: 'absolute',
        bottom: '5%',
        left: '2%',
        width: 'clamp(100px, 15vw, 200px)',
        height: 'clamp(60px, 10vw, 130px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 3,
        transition: 'transform 0.1s ease-out',
    },
    statsCluster: {
        position: 'absolute',
        right: 0,
        bottom: '10%',
        textAlign: 'right',
        fontFamily: "'Space Grotesk', sans-serif",
    },
    statRow: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginBottom: '0.5rem',
    },
    statLabel: {
        fontSize: '0.8rem',
        color: '#F2E8DC',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.7,
    },
    statValue: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#FF4400',
        fontFamily: "'Antonio', sans-serif",
        lineHeight: 0.9,
    },
    ctaContainer: {
        marginTop: '4rem',
        zIndex: 10,
    },
    bgLines: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 100px)',
        pointerEvents: 'none',
        zIndex: 0,
    },
};

const HomePage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const stockRef = useRef(null);
    const tallyRef = useRef(null);
    const glyphRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const stockTransform = `translateX(${mousePos.x * 0.5}px) translateY(${mousePos.y * 0.5}px)`;
    const tallyTransform = `translateX(${mousePos.x * 1.5}px) translateY(${mousePos.y * 1.5}px)`;
    const glyphTransform = `rotate(-2deg) translateX(${mousePos.x}px)`;

    const getTallySpanStyle = (index) => {
        const base = { ...customStyles.wordTallySpan };
        if (isHovered) {
            base.transform = index % 2 === 0 ? 'translateY(-10px)' : 'translateY(10px)';
        }
        return base;
    };

    return (
        <div style={{ ...customStyles.body, position: 'relative' }}>
            <div style={customStyles.bgLines}></div>



            <main
                style={customStyles.heroContainer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={customStyles.titleWrapper}>
                    <div
                        ref={stockRef}
                        style={{ ...customStyles.wordStock, transform: stockTransform }}
                    >
                        ST<span style={customStyles.wideO}>O</span>CK
                    </div>

                    <div
                        ref={tallyRef}
                        style={{ ...customStyles.wordTally, transform: tallyTransform }}
                    >
                        {['T', 'A', 'L', 'L', 'Y'].map((letter, i) => (
                            <span key={i} style={getTallySpanStyle(i)}>
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>

                <ChartGlyph glyphRef={glyphRef} transform={glyphTransform} />

                <div style={customStyles.statsCluster}>
                    <div style={customStyles.statRow}>
                        <span style={customStyles.statLabel}>Daily P&L</span>
                        <span style={customStyles.statValue}>
                            <span style={{ fontSize: '0.5em', verticalAlign: 'middle', marginRight: '5px' }}>▲</span>
                            12.4%
                        </span>
                    </div>
                    <div style={customStyles.statRow}>
                        <span style={customStyles.statLabel}>Positions</span>
                        <span style={customStyles.statValue}>84</span>
                    </div>
                </div>

                <div style={customStyles.ctaContainer}>
                    <TradeButton />
                </div>
            </main>
        </div>
    );
};

const ChartGlyph = ({ glyphRef, transform }) => {
    const gTopStyle = {
        borderBottom: '6px solid #FF4400',
        width: '100%',
        height: '100%',
        position: 'relative',
    };

    const gTopAfterStyle = {
        content: "''",
        position: 'absolute',
        right: '20%',
        height: '100%',
        width: '6px',
        background: '#FF4400',
    };

    const gMidStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    };

    const gBotStyle = {
        borderTop: '6px solid #FF4400',
        width: '100%',
        height: '100%',
        position: 'relative',
        marginTop: '10px',
    };

    return (
        <div
            ref={glyphRef}
            style={{ ...customStyles.chartGlyph, transform }}
        >
            <div style={gTopStyle}>
                <div style={gTopAfterStyle}></div>
            </div>
            <div style={gMidStyle}>
                <div style={{
                    width: '60%',
                    height: '6px',
                    background: '#FF4400',
                    transform: 'rotate(-15deg)',
                    transformOrigin: 'left',
                    position: 'absolute',
                    top: '50%',
                }}></div>
                <div style={{
                    width: '40%',
                    height: '6px',
                    background: '#FF4400',
                    right: 0,
                    position: 'absolute',
                    top: '20%',
                    transform: 'rotate(15deg)',
                }}></div>
            </div>
            <div style={gBotStyle}>
                <div style={{
                    position: 'absolute',
                    left: '30%',
                    height: '100%',
                    width: '6px',
                    background: '#FF4400',
                    bottom: 0,
                }}></div>
            </div>
        </div>
    );
};

const TradeButton = () => {
    const [hovered, setHovered] = useState(false);

    const btnStyle = {
        backgroundColor: 'transparent',
        color: hovered ? '#111111' : '#F2E8DC',
        fontFamily: "'Antonio', sans-serif",
        fontSize: '1.5rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        padding: '1rem 3rem',
        border: hovered ? '4px solid #FF4400' : '4px solid #F2E8DC',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'all 0.2s ease',
    };

    const overlayStyle = {
        content: "''",
        position: 'absolute',
        top: 0,
        left: hovered ? '0%' : '-100%',
        width: '100%',
        height: '100%',
        backgroundColor: '#FF4400',
        transition: 'left 0.3s cubic-bezier(0.8, 0, 0.2, 1)',
        zIndex: -1,
    };

    return (
        <>
        </>
    );
};

const Poster = () => {
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Archivo+Black&family=Space+Grotesk:wght@300;500;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { margin: 0; padding: 0; background-color: #111111; overflow-x: hidden; }
      #root { background-color: #111111; min-height: 100vh; }
    `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (

        <div style={{ backgroundColor: '#111111', minHeight: '100vh' }}>
            <HomePage />
        </div>

    );
};

export default Poster;