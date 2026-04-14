/* ============================================================
   StockTally — ui.js
   Reusable primitive components built on the theme.
   Import from here instead of writing inline styles repeatedly.
   ============================================================ */

import { colors, radius } from '../../theme/theme';

/* ── Button ─────────────────────────────────────────────── */
export const Btn = ({ variant = 'green', children, className = '', ...props }) => {
    const variantClass = {
        green: 'st-btn-green',
        red: 'st-btn-red',
        amber: 'st-btn-amber',
        ghost: 'st-btn-ghost',
    }[variant] || 'st-btn-green';

    return (
        <button className={`${variantClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

/* ── Badge ──────────────────────────────────────────────── */
export const Badge = ({ variant = 'ghost', children, className = '' }) => {
    const variantClass = {
        green: 'st-badge-green',
        red: 'st-badge-red',
        amber: 'st-badge-amber',
        blue: 'st-badge-blue',
        ghost: 'st-badge-ghost',
    }[variant] || 'st-badge-ghost';

    return <span className={`${variantClass} ${className}`}>{children}</span>;
};

/* ── Status Badge ───────────────────────────────────────── */
export const StatusBadge = ({ status }) => (
    <Badge variant={status === 'open' ? 'green' : 'red'}>{status}</Badge>
);

/* ── Profit Cell ────────────────────────────────────────── */
export const ProfitValue = ({ value }) => {
    const isPositive = value >= 0;
    return (
        <span className={isPositive ? 'st-profit' : 'st-loss'}>
            {isPositive ? '▲' : '▼'} ₹ {Math.abs(value)?.toFixed(2)}
        </span>
    );
};

/* ── Input ──────────────────────────────────────────────── */
export const Input = ({ label, className = '', ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="st-label">{label}</label>}
        <input className={`st-input ${className}`} {...props} />
    </div>
);

/* ── Select ─────────────────────────────────────────────── */
export const Select = ({ label, children, className = '', ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="st-label">{label}</label>}
        <select className={`st-select ${className}`} {...props}>
            {children}
        </select>
    </div>
);

/* ── Modal ──────────────────────────────────────────────── */
export const Modal = ({ title, onClose, size = 'md', children, footer }) => (
    <div className="st-overlay">
        <div className={`st-modal-${size}`}>
            <div className="st-modal-header">
                <h2 className="st-modal-title">{title}</h2>
                <button className="st-btn-icon" onClick={onClose} aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <div className="st-modal-body">{children}</div>
            {footer && <div className="st-modal-footer">{footer}</div>}
        </div>
    </div>
);

/* ── Divider ────────────────────────────────────────────── */
export const Divider = ({ className = '' }) => (
    <div className={`st-divider ${className}`} />
);

/* ── Dot Loader ─────────────────────────────────────────── */
export const DotLoader = () => (
    <div className="st-dot-loader">
        {[0, 150, 300].map((delay) => (
            <div
                key={delay}
                className="st-dot"
                style={{ animation: `bounce 0.8s ease-in-out ${delay}ms infinite` }}
            />
        ))}
        <style>{`
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-6px); }
      }
    `}</style>
    </div>
);

/* ── Bar Loader (StockTally branded) ────────────────────── */
export const BarLoader = () => {
    const barColors = ['#15803d', '#16a34a', '#22c55e', '#4ade80', '#22c55e', '#16a34a', '#15803d'];
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-end gap-1.5" style={{ height: 44 }}>
                {barColors.map((color, i) => (
                    <div
                        key={i}
                        className="st-bar"
                        style={{
                            height: '100%',
                            background: color,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-lg font-medium text-text-primary tracking-tight">StockTally</span>
                <span className="inline-block w-0.5 h-4 bg-green-400 rounded-sm animate-blink ml-0.5" />
            </div>
            <span className="text-xs text-green-400 tracking-widest uppercase animate-pulse">
                Fetching market data
            </span>
        </div>
    );
};

/* ── Empty State ────────────────────────────────────────── */
export const EmptyState = ({ message = 'No data found' }) => (
    <div className="st-empty-state">{message}</div>
);

/* ── Page wrapper ───────────────────────────────────────── */
export const Page = ({ children, className = '' }) => (
    <main className={`st-page ${className}`}>{children}</main>
);
