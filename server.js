var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
	}).listen(8090,  function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening on 8090');
});
