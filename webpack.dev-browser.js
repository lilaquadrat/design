const {merge} = require('webpack-merge');
const config = require('./webpack.config.js');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIR = __dirname;

const cert = {
  key: fs.readFileSync('render.lila-key.pem'),
  cert: fs.readFileSync('render.lila.pem')
}

module.exports = (env) => merge(config, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: `./projects/${env.company}/${env.project}/app.ts`
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.LOGLEVEL': JSON.stringify(process.env.LOGLEVEL),
      'process.env.company': JSON.stringify(env.company),
      'process.env.project': JSON.stringify(env.project)
    })
  ],
  devServer: {
    https: {
      key: cert.key,
      cert: cert.cert,
      ca: `${cert.key}${cert.cert}`,
    },
    static: [
      {
        directory: path.join(__dirname, `/projects/${env.company}/${env.project}/source`),
        publicPath: '/',
        watch: true,
      }
    ],
    client: {
      logging: "warn",
      overlay: true,
      progress: true,
    },
    host: 'render.lila',
    compress: true,
    port: 9001,
    hot: true,
    historyApiFallback: true,
  },
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
              }
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: [
          path.resolve('./source/less/base_bootstrap.less')
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
                  projectPath: `/projects/${env.company}/${env.project}`
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
