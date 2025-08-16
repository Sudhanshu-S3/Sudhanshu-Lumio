/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        matte: '#1B1C1D',     // primary background
        surface: '#232426',   // component surfaces
        edge: '#2A2B2D',      // borders
      },
    },
  },
  plugins: [],
}