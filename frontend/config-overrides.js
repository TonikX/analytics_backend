const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/ckeditor_plugins/openlink', to: 'openlink' }
      ]
    })
  )
  return config;
}