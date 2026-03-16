/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "raleway": ["Raleway", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
      },
      colors: {
        "cc-prim": "#071521",
        "cc-sec": "#384755",
        "cc-tert": "#3E88CD",
        "cc-acc": "#E2E2B6",
        "cc-offw": "#EBEBEB",
        "cc-red": "#D92C2C"
      }
    },
  },
  plugins: [],
}

