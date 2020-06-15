const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // devServer: {
  //   contentBase: './dist',
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new HtmlWebpackPlugin({
      title: 'Dog Raw Food Calculator',
      templateContent: ({htmlWebpackPlugin}) => `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="description" content="A calculator to create recipes for feeding dogs raw meals.">
          <title>${htmlWebpackPlugin.options.title}</title>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169425839-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-169425839-1');
          </script>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `
    }),
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
    // {
    //   test: /\.html$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: "html-loader"
    //     }
    //   ]
    // }
  ]},
  optimization: {
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