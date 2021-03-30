const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const PRODUCTION = process.env.NODE_ENV === 'production';
const DEV = !PRODUCTION;

module.exports = {
	mode: PRODUCTION ? 'production' : 'development',
	entry: {
		'app-a': './app-a/index.js',
		'app-b': './app-b/index.js'
	},
	output: {
		path: path.resolve(__dirname, './static'),
		filename: 'js/[name]-[fullhash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main'],
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		}
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: 'svelte-loader'
			},
			{
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			publicPath: '/',
			inject: true,
			hash: false,
			template: './app-a/index.html',
			filename: 'app-a/index.html',
			chunks: ['app-a']
		}),
		new HtmlWebpackPlugin({
			publicPath: '/',
			inject: true,
			hash: false,
			template: './app-b/index.html',
			filename: 'app-b/index.html',
			chunks: ['app-b']
		})
	],
	devServer: {
		host: '0.0.0.0',
		historyApiFallback: true,
		hot: false
	}
};