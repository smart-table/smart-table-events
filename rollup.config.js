module.exports = {
	input: './index.js',
	output: [
		{format: 'es', file: './dist/index.mjs'},
		{format: 'cjs', file: './dist/index.js'},
		{format: 'iife', name: 'smartTableEvents', file: './dist/smart-table-events.js', sourcemap: true}
	],
};
