const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  output: {
    //filename: '[name].[contenthash].js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // devServer: {
  //   contentBase: './dist',
  // },
  plugins: [
    // new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      exclude: /node_modules/,
      use: [
        'file-loader',
      ],
    },
    {
      test: /\.html$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "html-loader"
        }
      ]
    }
  ]},
  optimization: {
    //moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};