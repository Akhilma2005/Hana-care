/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FCEEF2',
          DEFAULT: '#D4376F', // Hana Care Pink
          dark: '#B02555',
          hover: '#C22D60',
        },
        secondary: {
          light: '#F3EEF6',
          DEFAULT: '#7C5D9F', // Overnight purple
          dark: '#5D3F75',
        },
        accent: {
          pink: '#FDEEF2',
          purple: '#F5F0F8',
          yellow: '#FFFBEA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
