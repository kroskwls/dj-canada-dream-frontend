const colors = require('tailwindcss/colors');

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				line: colors.lime
			}
		},
	},
	plugins: [],
}