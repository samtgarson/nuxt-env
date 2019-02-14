const strategies = {
  server (ctx, inject) {
    const {
      env: envFromNuxtConfig = {},
      req: {
        env: envForServer = {},
        clientEnv: envForClient = {}
      } = {}
    } = ctx

    inject('env', {
      ...envFromNuxtConfig,
      ...envForServer
    })

    ctx.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.env = {
        ...envFromNuxtConfig,
        ...envForClient
      }
    })
  },

  client (ctx, inject) {
    const env = ctx.nuxtState !== undefined ? ctx.nuxtState.env : ctx.env
    inject('env', env)
  }
}

export default (ctx, inject) => {
  const key = process.client ? 'client' : 'server'
  const strategy = strategies[key]
  return strategy(ctx, inject)
}
