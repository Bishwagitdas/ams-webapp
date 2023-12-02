/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  fontFamily: {
    Poppins: ["Poppins", "sans-serif"],
    PoppinsBold: [],
  },
  plugins: [require("daisyui")],
};
