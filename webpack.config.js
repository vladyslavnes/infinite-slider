module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: './dist/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
		]
	}
}