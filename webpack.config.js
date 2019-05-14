const path = require('path');

module.exports = {
	mode: "production",
	output: {
		filename: "bundle.js"
	},
	resolveLoader: {
		modules: [path.resolve(__dirname, "node_modules")]
	},
	module: {
		rules: [
			{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
			}
		]
	}
}