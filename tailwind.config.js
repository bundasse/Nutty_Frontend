/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,vue,js}"],
  theme: {
    extend: {
      colors: {
        nutty : {
          light: '#FFCA2B',
          DEFAULT: '#FFB321',
          dark: '#FF9900'
        }
      }
    }
  },
  plugins: [],
}

