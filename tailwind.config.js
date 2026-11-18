/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        surface: '#080808',
        card: '#101010',
        'card-hover': '#161616',
        border: 'rgba(255, 255, 255, 0.1)',
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
        ink: '#F4F1EE',
        'ink-muted': '#8E8D8A',
        'ink-faint': '#4E4D4A',
        lime: '#D4FF00',
        'lime-dim': 'rgba(212, 255, 0, 0.12)',
        red: '#FF4C24',
        crimson: '#FF4C24',
        alert: '#FF453A',
        success: '#32D74B'
      },
      fontFamily: {
        display: ['"Geist"', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Geist Mono"', '"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
