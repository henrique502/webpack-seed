/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const {Copy, DefinePlugin, ESLint, HTML, TsChecker, Hot} = require("./webpack.shared");

const config = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
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
  plugins: [
    ESLint,
    TsChecker,
    DefinePlugin,
    Copy,
    HTML,
    Hot,
  ],
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true
  },
};

module.exports = config;
