const webpack = require('webpack');
const { merge } = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

module.exports = (env, argv) => merge(baseConfig, {
  // Point entry to your app's server entry file
  entry: './src/app-server/server-entry.ts',
  mode: 'production',

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: 'node',

  // For bundle renderer source map support
  devtool: false,

  // This tells the server bundle to use Node-style exports
  output: {
    libraryTarget: 'commonjs2',
    path: `${__dirname}/dist-bundle`,
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/,
    allowlist: [
      'vue',
      'vuex',
      'vue-router',
      'vue-class-component',
      'vue-property-decorator',
      'dayjs',
      'dayjs/locale/de',
      'dayjs/plugin/relativeTime',
      'highlight.js/lib/core',
      '@lilaquadrat/studio/lib/frontend',
      'highlight.js/lib/languages/javascript'
    ]
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(),
    new VueSSRServerPlugin({
      filename: 'server.bundle.json',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        resourceQuery: /main/,
        use: [
          'vue-style-loader',
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
          path.resolve(`./${env.project === 'base' ? 'base' : 'projects'}/${env.company}/${env.project}/source/less/base.less`),
        ],
        use: [
          {
            loader: 'vue-style-loader',
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
        loader: 'vue-loader',
      },
    ],
  },
});
