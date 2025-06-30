/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'eco-green': {
          light: '#a7f3d0',
          DEFAULT: '#34d399',
          dark: '#059669',
        },
        'eco-gray': {
          light: '#f3f4f6',
          DEFAULT: '#9ca3af',
          dark: '#4b5563',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
