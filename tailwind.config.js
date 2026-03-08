/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        witch: {
          void:    '#06040E',
          deep:    '#0D0A1A',
          purple:  '#1A1033',
          violet:  '#BF5FFF',
          rose:    '#C9956C',
          green:   '#7FFF00',
          mist:    '#E8D5FF',
          silver:  '#C4B5D4',
        },
      },
      fontFamily: {
        cinzel:  ['Cinzel Decorative', 'serif'],
        dm:      ['DM Serif Display', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
        'orbit':       'orbit 20s linear infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'text-reveal': 'textReveal 1.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px #BF5FFF40' },
          '50%':     { boxShadow: '0 0 60px #BF5FFF90, 0 0 100px #BF5FFF30' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        textReveal: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to:   { clipPath: 'inset(0 0% 0 0)' },
        },
      },
    },
  },
  plugins: [],
};
