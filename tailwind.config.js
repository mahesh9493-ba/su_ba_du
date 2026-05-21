/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          red: "#ff2e63",
          crimson: "#e63946",
          ruby: "#ae2012",
          dark: "#080303",
          darker: "#030101",
          deep: "#120606",
          rose: "#ff8fa3",
          glow: "#e63946",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Outfit'", "sans-serif"],
        handwritten: ["'Sacramento'", "cursive"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'candle-flicker': 'flicker 1.2s ease-in-out infinite alternate',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', filter: 'drop-shadow(0 0 3px rgba(230,57,70,0.8))' },
          '50%': { transform: 'scale(1.08) rotate(1.5deg) translateY(-1px)', filter: 'drop-shadow(0 0 7px rgba(255,46,99,0.9))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 2px rgba(230,57,70,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 10px rgba(230,57,70,0.8))' }
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' }
        }
      }
    },
  },
  plugins: [],
}
