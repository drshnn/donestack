/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'authbg': "url('./src/assets/bg-auth.png')"

      },
      colors:{
        'lightbg':'#F4F1E9',
        'mygreen':'#83D300'
      }
    },
  },
  plugins: [],
}
