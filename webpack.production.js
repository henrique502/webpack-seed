/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {Copy, DefinePlugin, ESLint, HTML, TsChecker, optimize} = require("./webpack.shared");


const config = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  mode: optimize ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  node: false,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    ESLint,
    TsChecker,
    DefinePlugin,
    Copy,
    HTML,
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
