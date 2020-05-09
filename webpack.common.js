const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Cream Cheese is for lovers',
    //   template: "./src/client/index.html",
    //   filename: "index.html"
    // }),
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
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        { loader: 'sass-loader' }
      ]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [
        'file-loader',
      ],
    },
    {
      test: /\.html$/,
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