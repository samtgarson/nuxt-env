const strategies = {
  server (ctx, inject, pluginEnv) {
    const {
      env: ctxEnv = {},
    } = ctx

    const env = {
      ...ctxEnv,
      ...pluginEnv
    }

    inject('env', env)
  },

  client (ctx, inject, pluginEnv) {
    const env = {
      ...ctx.env,
      ...pluginEnv
    }
    inject('env', env)
  }
}

export default (ctx, inject) => {
  <% if(options.env && options.keys) { %>
    const pluginEnv = <%= JSON.stringify(_.pick(options.env, options.keys)) %>
  <% } else { %>
    const pluginEnv = {}
  <% } %>

  const key = process.client ? 'client' : 'server'
  const strategy = strategies[key]
  return strategy(ctx, inject, pluginEnv)
}
