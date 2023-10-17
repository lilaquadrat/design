const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('./webpack.config.js');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const getEnv = require('./getEnv.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIR = __dirname;

module.exports = (env, argv) => {

  const useEnv = getEnv(env);

  return merge(config, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      app: `./${useEnv.path}/${useEnv.company}/${useEnv.project}/app.ts`
    },
    output: {
      path: `${DIR}/dist`,
      filename: '[name].[contenthash].js',
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({cleanStaleWebpackAssets: true}),
      new webpack.DefinePlugin({
        'process.env.LOGLEVEL': JSON.stringify(process.env.LOGLEVEL),
        'process.env.company': JSON.stringify(useEnv.company),
        'process.env.project': JSON.stringify(useEnv.project),
        'process.env.apiMode': JSON.stringify('next'),
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
      new HtmlWebpackPlugin({
        template: `./${useEnv.path}/${useEnv.company}/${useEnv.project}/index.html`,
        filename: 'index.html',
        templateParameters: useEnv
      })
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          resourceQuery: /main/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  relativeUrls: false,
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          exclude: [
            path.resolve(`./projects/${useEnv.company}/${useEnv.project}/source/less/base.less`),
          ],
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  relativeUrls: false,
                  modifyVars: {
                    projectPath: `/${useEnv.path}/${useEnv.company}/${useEnv.project}`
                  },
                }
              },
            },
          ],
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            }
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
      ],
    },
  });
  
}