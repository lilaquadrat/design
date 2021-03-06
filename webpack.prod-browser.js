const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('./webpack.config.js');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIR = __dirname;

module.exports = (env, argv) => merge(config, {
  mode: 'production',
  entry: {
    app: `./${env.project === 'base' ? 'base' : 'projects'}/${env.company}/${env.project}/app.ts`
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
      'process.env.company': JSON.stringify(env.company),
      'process.env.project': JSON.stringify(env.project)
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
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
          path.resolve(`./projects/${env.company}/${env.project}/source/less/base.less`),
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
                  projectPath: `/${env.project === 'base' ? 'base' : 'projects'}/${env.company}/${env.project}`
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
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
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
