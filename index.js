const path = require('path')
const middleware = require('./lib/middleware')

module.exports = function NuxtEnv ({ keys }) {
  this.addServerMiddleware(middleware(keys))

  const src = path.resolve(__dirname, 'lib/plugin.js')
  this.addPlugin({
    src,
    fileName: 'nuxt-env.js'
  })
}
