/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{js,jsx}", "./public/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "system-ui", "sans-serif"],
    },
    colors: {
      teal: "#154752",
      "teal-subtle": "#2C5963",
      "teal-mid": "#8AA3A8",
      "teal-light": "#DEEFEC",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
