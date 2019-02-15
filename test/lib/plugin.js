import plugin from '@/lib/plugin'

let inject
let context
const originalContext = {
  beforeNuxtRender: jest.fn(),
  env: {
    test1: 'foo',
    test2: 'bar'
  },
  nuxtState: {
    env: {}
  }
}

const expectedEnv = {
  test1: 'foo', // from the config env
  test2: 'baz', // from config env, overwritten by nuxt-env
  test3: 'foobar' // from our module
}

const expectedClientEnv = {
  test1: 'foo', // from the config env
  test2: 'blork' // from config env, overwritten by nuxt-env
}

beforeEach(() => {
  inject = jest.fn()
  context = { ...originalContext }
})

describe('Plugin', () => {
  describe('client side', () => {
    beforeEach(() => {
      process.client = true
      process.server = false
      plugin(context, inject)
    })

    it('injects the env', () => {
      expect(inject).toHaveBeenCalledWith('env', context.nuxtState.env)
    })

    describe('in a SPA', () => {
      beforeEach(() => {
        delete context.nuxtState
        plugin(context, inject)
      })

      it('injects the nuxt env', () => {
        expect(inject).toHaveBeenCalledWith('env', context.env)
      })
    })
  })

  describe('server side', () => {
    const req = {
      env: { test2: 'baz', test3: 'foobar' },
      clientEnv: { test2: 'blork' }
    }

    beforeEach(() => {
      process.client = false
      process.server = !process.client
    })

    describe('in a normal case', () => {
      beforeEach(() => {
        context.req = req
        plugin(context, inject)
      })

      it('injects the env', () => {
        expect(inject).toHaveBeenCalled()
        const { calls: { 0: { 0: calls } } } = inject.mock
        expect(calls).toEqual('env')
      })

      it('merges the two env vars', () => {
        const { calls: { 0: { 1: calls } } } = inject.mock
        expect(calls).toMatchObject(expectedEnv)
      })

      it('calls before render hook with a callback', () => {
        expect(context.beforeNuxtRender).toHaveBeenCalled()
        const { calls: { 0: { 0: hookCallback } } } = context.beforeNuxtRender.mock

        expect(hookCallback).toBeInstanceOf(Function)
      })

      it('adds env to nuxtState', () => {
        const { calls: { 0: { 0: hookCallback } } } = context.beforeNuxtRender.mock

        hookCallback(context)

        expect(context.nuxtState.env).toMatchObject(expectedClientEnv)
      })
    })

    describe('with missing dependencies', () => {
      beforeEach(() => {
        delete context.env
      })

      it('has sensible defaults', () => {
        const runPlugin = () => { plugin(context, inject) }
        expect(runPlugin).not.toThrow()
      })
    })
  })
})
