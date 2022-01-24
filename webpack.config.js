const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      'grunt',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset',
      },
      {
        test: /\.(jp(e)?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name].[ext]',
          },
        },
      },
    ],
  },
};
