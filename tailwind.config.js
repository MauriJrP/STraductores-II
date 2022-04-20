module.exports = {
	important: true,
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				test: 'linear-gradient(180deg, rgba(0,0,0,1) 18%, rgba(159,18,57,1) 47%, rgba(225,29,72,1) 69%);',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
