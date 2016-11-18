module.exports = {
	entry: './app/app.jsx',
	output:{
		path: __dirname,
		filename: "./public/bundle.js"
	},
	resolve: {
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
		}
		]
	}
};