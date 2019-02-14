module.exports = (keys = []) =>
  (req = {}, res, next = () => { }) => {
    if (!req.env) req.env = {}
    if (!req.clientEnv) req.clientEnv = {}

    keys.forEach(k => {
      const val = process.env[k.key] || k.default
      req.env[k.name] = val
      if (!k.secret) req.clientEnv[k.name] = val
    })

    next()
  }
