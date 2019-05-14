const path = require('path');

module.exports = {
	mode: "production",
	output: {
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [require.resolve('babel-loader')]
			}
		]
	}
}