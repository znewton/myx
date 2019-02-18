const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  favicon: './public/favicon.ico',
});
const stylableWebpackPlugin = new StylableWebpackPlugin();

module.exports = (env, argv) => {
  let userServiceUrl = 'https://localhost:4466';
  let youtubeServiceUrl = 'https://localhost:3366';
  if (argv.mode === 'production') {
    userServiceUrl = '/user-service';
    youtubeServiceUrl = '/youtube-service';
  }

  const definePlugin = new webpack.DefinePlugin({
    USER_SERVICE_URL: userServiceUrl,
    YOUTUBE_SERVICE_URL: youtubeServiceUrl,
  });

  const config = {
    entry: './src/index.tsx',

    output: {
      path: path.join(__dirname, 'dist'),
    },

    devtool: 'source-map',

    resolve: {
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      ],
    },

    plugins: [htmlWebpackPlugin, stylableWebpackPlugin, definePlugin],
  };

  if (argv.mode === 'development') {
    config.devServer = {
      port: 5566,
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: {
        index: '/index.html',
        rewrites: [{ from: /\/./, to: '/index.html' }],
      },
    };
  }

  return config;
};
