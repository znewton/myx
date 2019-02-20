const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  favicon: './public/favicon.ico',
});
const stylableWebpackPlugin = new StylableWebpackPlugin();

module.exports = (env, argv) => {
  let dataServiceUrl = 'https://localhost:4466';
  let youtubeServiceUrl = 'https://localhost:3366';
  if (argv.mode === 'production') {
    dataServiceUrl = 'https://myxdata.znewton.xyz';
    youtubeServiceUrl = 'https://myxyt.znewton.xyz';
  }

  const definePlugin = new webpack.DefinePlugin({
    DATA_SERVICE_URL: JSON.stringify(dataServiceUrl),
    YOUTUBE_SERVICE_URL: JSON.stringify(youtubeServiceUrl),
    FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
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
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },

    plugins: [htmlWebpackPlugin, stylableWebpackPlugin, definePlugin],
  };

  if (argv.mode === 'development') {
    config.devServer = {
      port: 5566,
      overlay: true,
      historyApiFallback: {
        index: '/index.html',
        rewrites: [{ from: /\/./, to: '/index.html' }],
      },
    };
  }

  return config;
};
