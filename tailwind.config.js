/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{js,jsx}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        teal: "#154752",
        "teal-subtle": "#34707E",
        "teal-mid": "#769fa8",
        "teal-light": "#DEEFEC",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
