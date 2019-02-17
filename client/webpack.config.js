const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html',
  favicon: './public/favicon.ico',
});
const stylableWebpackPlugin = new StylableWebpackPlugin();

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist/'),
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

  plugins: [htmlWebpackPlugin, stylableWebpackPlugin],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

module.exports = config;
