const path = require('path');

module.exports = {
	mode: "production",
	output: {
		filename: "bundle.js"
	},
	resolve: {
		alias: {
			"@babel/loader": require.resolve(path.resolve(__dirname, "node_modules/@babel/core/"))
		}
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