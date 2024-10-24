/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '750px',  // Custom screen size for 'md'
      'lg': '1000px', // Custom screen size for 'lg'
      'xl': '1280px',
      '2xl': '1536px',
      
    },
  },
  plugins: [],
}