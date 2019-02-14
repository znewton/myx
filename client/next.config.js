const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  target: 'serverless',
  webpack(config, options) {
    config.plugins.push(new StylableWebpackPlugin());
    return config;
  },
});
