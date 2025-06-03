/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFDE59', // Yellow
        secondary: '#FFFFFF', // White
        accent: '#FFB800', // Darker yellow for accents
      },
    },
  },
  plugins: [],
}
