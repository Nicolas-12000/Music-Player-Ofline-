/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,html}",
    "./index.html"
  ],
  theme: {
    extend: {
      animation: {
        'gradient-pulse': 'gradient-pulse 10s ease infinite',
        'hover-scale': 'hover-scale 0.3s ease-in-out'
      },
      keyframes: {
        'gradient-pulse': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        'hover-scale': {
          'from, to': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },
      colors: {
        'music-dark': '#1a1a1a',
        'music-gray': '#3a3a3a',
        'music-accent': '#646cff',
        'player-bg': '#242424'
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}