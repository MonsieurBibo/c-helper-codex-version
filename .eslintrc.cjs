module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'wikimedia/client/es6',
		'wikimedia/mediawiki',
		'wikimedia/vue3/es6',
		'wikimedia/language/es6'
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2015,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'vue'
	]
};
