const strategies = {
  server (ctx, inject) {
    const {
      env: ctxEnv = {},
      req: { env: reqEnv = {} } = {}
    } = ctx

    const env = {
      ...ctxEnv,
      ...reqEnv
    }

    inject('env', env)

    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.env = env
    })
  },

  client (ctx, inject) {
    inject('env', ctx.nuxtState.env)
  }
}

export default (ctx, inject) => {
  const key = process.client ? 'client' : 'server'
  const strategy = strategies[key]
  return strategy(ctx, inject)
}
