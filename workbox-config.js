module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,ico,png,svg,html,js,json,txt}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};