const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

module.exports = {
	entry: [
		'./src/index.js',
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'html/dist'),
		libraryExport: 'default'
	},
	devtool: 'source-map',
	mode: 'production',
	watch: false,
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 200,
		poll: 1000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.ts', '.js', '.css', '.scss', '.sass', '.vue']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
                options:
				{
                    loaders:
					{
                        ts: 'ts-loader'
                    },
                    esModule: true
                }
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin
		({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	]
};
