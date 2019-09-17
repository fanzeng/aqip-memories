let HTMLWebpackPlugin = require('html-webpack-plugin');
let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
const path = require('path');
module.exports = {
  mode: 'development',
  entry: __dirname + '/app/index.js',
  resolve : {
    modules: [
      path.resolve('node_modules'),
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    },
    {
      test: /\.css$/i,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader'],
    }]
  },
  output: {
  	filename: 'transformed.js',
  	path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};

