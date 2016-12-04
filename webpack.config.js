var webpack = require('webpack');

module.exports = {
	entry: [
		'script!jquery/dist/jquery.min.js',
		'./app/app.jsx'
	],
	externals:{
		jquery: 'jQuery'
	},
	plugins:[
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery'
		})
	],
	output:{
		path: __dirname,
		filename: "./public/bundle.js"
	},
	resolve: {
		root: __dirname,
		modulesDirectories : [
			'node_modules',
			'./app/components',
			'./app/api'
		],
		alias :{
			applicationStyle:"public/css/app.scss"
		},
		extensions : ['','.js','.jsx']
	},
	module:{
		loaders:[
		{
			loader:"babel-loader",
			query:{
				presets: ["react","es2015"]
			},
			exclude: /(node_modules)|(bower_components)/,
			test:/\.jsx?$/
		},
		{
			loader:"url-loader",
			test:/\.(png|woff|woff2|eot|ttf|svg)$/
		}
		]
	}
};