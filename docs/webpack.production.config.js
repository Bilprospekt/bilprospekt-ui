var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    path.join(__dirname, '/src/index')
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, 'www/index.html')
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'bilprospekt-ui': path.resolve(__dirname, '../src')
    },
    modulesDirectories: [
      "node_modules",
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },
  devServer: {
    contentBase: 'build',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, '../src'),
      ]
    },
   { test: /\.css$/, loader: "style-loader!css-loader" }
	]
  }
};
