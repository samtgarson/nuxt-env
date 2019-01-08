const path = require('path')

module.exports = function NuxtEnv ({ keys }) {
  const src = path.resolve(__dirname, 'lib/plugin.template.js')
  this.addPlugin({
    src,
    filename: 'nuxt-env',
    options: {
      keys,
      env: process.env
    }
  })
}
