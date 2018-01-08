module.exports = (keys = []) => (req = {}, res, next = () => {}) => {
  if (!req.env) req.env = {}
  keys.forEach(key => req.env[key] = process.env[key])
  next()
}
