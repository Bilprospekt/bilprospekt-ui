var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8090',
    'webpack/hot/only-dev-server',
    './docs/src/index'
  ],
  output: {
    path: path.join(__dirname, 'docs/lib'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'docs/src')
    },
   { test: /\.css$/, loader: "style-loader!css-loader" }
	]
  }
};
