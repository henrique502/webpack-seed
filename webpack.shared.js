/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const dot = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const project = require('./package.json');
const path = require("path");

process.env.INLINE_RUNTIME_CHUNK = 'false';
process.env.REACT_APP_URL = '';
process.env.REACT_APP_VERSION = project.version;

const optimize = process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION';
module.exports.optimize = optimize;

process.on('unhandledRejection', err => {
  throw err;
});

dot.config();

const define = {};
const envs = {};
Object.keys(process.env).map((env) => {
  if (env.startsWith('REACT_APP_')) {
    define[env] = process.env[env] || '';
    envs[env] = JSON.stringify(process.env[env]);
  }

  return env;
});

exports.DefinePlugin = new webpack.DefinePlugin({
  "process.env": envs,
});

const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

exports.HTML = new HtmlWebpackPlugin({
  templateParameters: define,
  template: path.resolve(__dirname, 'src', 'index.ejs'),
  filename: path.resolve(__dirname, 'build', 'index.html'),
  inject: 'body',
  minify: optimize ? minify : {},
});

exports.ESLint = new ESLintPlugin({
  extensions: ["js", "jsx", "ts", "tsx"],
});

exports.TsChecker = new ForkTsCheckerWebpackPlugin({
  async: false,
});

exports.Copy = new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "public"),
      to: path.resolve(__dirname, "build"),
    },
  ],
});

exports.Hot = new webpack.HotModuleReplacementPlugin();
