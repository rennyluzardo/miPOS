const path = require('path')
const withSass = require('@zeit/next-sass')
const webpack = require('webpack')

module.exports = withSass({
  webpack(config, options) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    )

    config.module.rules.push({
      test: /\.scss/,
      loader: 'import-glob-loader'
    })

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      routes: path.resolve(__dirname, 'routes.js')
    }

    return config
  }
})
