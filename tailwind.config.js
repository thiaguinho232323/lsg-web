/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        carbon: '#141414',
        line: '#262626',
        ivory: '#EDE8DF',
        stone: '#8C877F',
        gold: '#C6A664',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
      },
    },
  },
  plugins: [],
};
