module.exports = {
	ci: {
		collect: {
			startServerCommand: 'pnpm start',
			url: ['http://localhost:3000/chakra'],
		},
		upload: {
			/* Add configuration here */
			target: 'temporary-public-storage',
		},
	},
};
