/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-button': '#238636',
        'green-button-hover': '#2EA043',
      }
    },
  },
  plugins: [],
}