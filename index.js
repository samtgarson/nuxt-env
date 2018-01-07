const path = require('path')

const middleware = keys => (req, res, next) => {
  if (!req.env) req.env = {}
  keys.forEach(key => req.env[key] = process.env[key])
  next()
}

module.exports = function NuxtEnv ({ keys }) {
  this.addServerMiddleware(middleware(keys))

  const src = path.resolve(__dirname, 'plugin.js')
  this.addPlugin({
    src,
    filename: 'nuxt-env'
  })
}
