const {merge} = require('webpack-merge');
const config = require('./webpack.config.js');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getEnv = require('./getEnv.js');

const DIR = __dirname;

const cert = {
  key: fs.readFileSync('render.lila-key.pem'),
  cert: fs.readFileSync('render.lila.pem')
}

module.exports = (env) => {

  const useEnv = getEnv(env);

  return merge(config, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      app: `./${useEnv.path}/${useEnv.company}/${useEnv.project}/app.ts`
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.LOGLEVEL': JSON.stringify(process.env.LOGLEVEL),
        'process.env.company': JSON.stringify(useEnv.company),
        'process.env.project': JSON.stringify(useEnv.project)
      }),
      new HtmlWebpackPlugin({
        template: `./${useEnv.path}/${useEnv.company}/${useEnv.project}/index.html`,
      })
    ],
    devServer: {
      server: {
        type: 'https',
        options: {
          key: cert.key,
          cert: cert.cert,
          ca: `${cert.key}${cert.cert}`,
        }
      },
      static: [
        {
          directory: path.join(__dirname, `/dist`),
          publicPath: '/',
          watch: true,
        },
        {
          directory: path.join(__dirname, `/projects/${useEnv.company}/${useEnv.project}/source`),
          publicPath: '/',
          watch: true,
        }
      ],
      client: {
        logging: "warn",
        overlay: true,
        progress: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      host: 'render.lila',
      compress: true,
      port: 9001,
      hot: true,
      // historyApiFallback: true,
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
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
          },
        },
      ],
    },
  });

}
