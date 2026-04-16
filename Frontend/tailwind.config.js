/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        bg: {
          base: '#060910',
          surface: '#0d1117',
          raised: '#111827',
          overlay: '#1a2235',
          border: '#1e2d3d',
        },
        // Text
        text: {
          primary: '#f0fdf4',
          secondary: '#cbd5e1',
          muted: '#64748b',
          hint: '#475569',
        },
        // Brand green (up / positive)
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14291f',
          border: '#166534',
        },
        // Red (down / negative)
        red: {
          400: '#f87171',
          600: '#dc2626',
          900: '#2d1515',
          border: '#7f1d1d',
        },
        // Amber (warning / update)
        amber: {
          400: '#fbbf24',
          900: '#1c1400',
          border: '#ca8a04',
        },
        // Blue (info)
        blue: {
          400: '#93c5fd',
          900: '#1e3a5f',
          border: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ["'Poppins'", 'system-ui', 'sans-serif'],
        mono: ["'Courier New'", 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs: ['11px', '16px'],
        sm: ['12px', '18px'],
        base: ['13px', '20px'],
        md: ['14px', '22px'],
        lg: ['16px', '24px'],
        xl: ['18px', '28px'],
        '2xl': ['22px', '32px'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },
      spacing: {
        px: '1px',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4)',
        modal: '0 8px 32px rgba(0,0,0,0.6)',
      },
      transitionDuration: {
        fast: '100ms',
        normal: '150ms',
        slow: '250ms',
      },
      keyframes: {
        "bar-pulse": {
          "0%, 100%": { transform: "scaleY(0.2)" },
          "50%": { transform: "scaleY(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "bar-pulse": "bar-pulse 1.1s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-down": "slide-down 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
