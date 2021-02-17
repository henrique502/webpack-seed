const path = require('path');
const webpack = require('webpack');
const env = require('./env');

const config = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'release'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'babel-loader' },
          // { loader: 'babel-eslint' },
        ],
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 30000,
            name: 'img/[name].[ext]',
          },
        }],
      }, {
        test: /\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
          },
        }],
      },
    ],
  },
};

module.exports = config;
