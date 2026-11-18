/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0a0a0a',
        card: '#111111',
        'card-hover': '#161616',
        border: 'rgba(255, 255, 255, 0.1)',
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
        ink: '#F4F1EE',
        'ink-muted': '#8E8D8A',
        'ink-faint': '#4E4D4A',
        lime: '#D4FF00',
        'lime-dim': 'rgba(212, 255, 0, 0.12)',
        alert: '#FF453A',
        success: '#32D74B'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
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
