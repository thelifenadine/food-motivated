var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: ['babel-loader', 'eslint-loader'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}