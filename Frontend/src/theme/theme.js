/* ============================================================
   StockTally — theme.js
   Single source of truth for all design tokens.
   Use these in JS/JSX when Tailwind classes aren't enough.
   ============================================================ */

export const colors = {
    // Backgrounds
    bgBase: '#060910',
    bgSurface: '#0d1117',
    bgRaised: '#111827',
    bgOverlay: '#1a2235',
    bgBorder: '#1e2d3d',

    // Text
    textPrimary: '#f0fdf4',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    textHint: '#475569',

    // Green (positive / up)
    green400: '#4ade80',
    green500: '#22c55e',
    green600: '#16a34a',
    green700: '#15803d',
    green900: '#14291f',
    greenBorder: '#166534',

    // Red (negative / down)
    red400: '#f87171',
    red600: '#dc2626',
    red900: '#2d1515',
    redBorder: '#7f1d1d',

    // Amber (warning / update)
    amber400: '#fbbf24',
    amber900: '#1c1400',
    amberBorder: '#ca8a04',

    // Blue (info / entry type)
    blue400: '#93c5fd',
    blue900: '#1e3a5f',
    blueBorder: '#1d4ed8',
};

export const font = {
    sans: "'Poppins', system-ui, sans-serif",
    mono: "'Courier New', monospace",
};

export const radius = {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
};

export const spacing = {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    14: '56px',
};

/* ── Semantic helpers ──────────────────────────────────── */

/**
 * Returns green or red color based on value sign.
 * Usage: profitColor(trade.profit)
 */
export const profitColor = (value) =>
    value >= 0 ? colors.green400 : colors.red400;

/**
 * Returns badge style object for trade status.
 * Usage: statusBadge('open') or statusBadge('closed')
 */
export const statusBadge = (status) =>
    status === 'open'
        ? { background: colors.green900, color: colors.green400, border: `1px solid ${colors.greenBorder}` }
        : { background: colors.red900, color: colors.red400, border: `1px solid ${colors.redBorder}` };

/**
 * Capitalize first letter utility.
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
