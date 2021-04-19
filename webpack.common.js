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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new HtmlWebpackPlugin({
      favicon: "./src/assets/favicon.ico",
      title: 'Raw Dog Food Calculator',
      templateContent: ({htmlWebpackPlugin}) => `<!DOCTYPE html>
      <html>
        <head>
          <meta name=”robots” content="index, follow">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta charset="utf-8"/>
          <meta name="description" content="A calculator to create recipes for feeding dogs raw meals. DIY Raw Dog Food Helper.">
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
