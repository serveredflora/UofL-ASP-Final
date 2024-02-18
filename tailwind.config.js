/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./client/**/*.{js,jsx}", "./public/**/*.{html,js}"],
	theme: {
		fontFamily: {
			sans: ["Poppins", "system-ui", "sans-serif"],
		},
		colors: {
			teal: "#154752",
			"teal-light": "#DEEFEC",
		},
	},
	plugins: [],
};
