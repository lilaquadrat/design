const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIR = __dirname;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}


module.exports = {
  context: DIR,
  resolve: {
    plugins: [new TsconfigPathsPlugin({})],
    extensions: ['.js', '.ts', '.css', '.vue', '.woff', '.json'],
    modules: [
      'node_modules',
      path.resolve(DIR, 'node_modules'),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      },
    ],
  },
};
