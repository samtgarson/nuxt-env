import Middleware from '@/lib/middleware'

describe('Middleware', () => {
  it('creates a middleware function', () => {
    const middleware = Middleware()

    expect(middleware).toBeInstanceOf(Function)
  })

  describe('for different types of key', () => {
    let req
    const name = 'TEST_VALUE'
    const key = 'TEST_KEY'
    const expectedValue = 'test value'

    beforeEach(() => {
      req = { env: {}, clientEnv: {} }
    })

    afterEach(() => {
      delete process.env[key]
    })

    it('adds env to the request', () => {
      const middleware = Middleware([{ name: key, key }])
      process.env[key] = expectedValue

      middleware(req, {})

      expect(req.env).toHaveProperty(key, expectedValue)
      expect(req.clientEnv).toHaveProperty(key, expectedValue)
    })

    it('handles a new name', () => {
      const middleware = Middleware([{ name, key }])
      process.env[key] = expectedValue

      middleware(req, {})

      expect(req.env).toHaveProperty(name, expectedValue)
      expect(req.clientEnv).toHaveProperty(name, expectedValue)
    })

    it('handles a secret var', () => {
      const middleware = Middleware([{ name, key, secret: true }])
      process.env[key] = expectedValue

      middleware(req, {})

      expect(req.env).toHaveProperty(name, expectedValue)
      expect(req.clientEnv).not.toHaveProperty(name, expectedValue)
    })

    it('handles a default value', () => {
      const middleware = Middleware([{ name, key, default: 'default' }])

      middleware(req, {})

      expect(req.env).toHaveProperty(name, 'default')
      expect(req.clientEnv).toHaveProperty(name, 'default')
    })
  })

  it('calls next when its finished', () => {
    const middleware = Middleware()
    const next = jest.fn()
    middleware({}, {}, next)

    expect(next).toHaveBeenCalled()
  })

  it('handles empty arguments', () => {
    const middleware = Middleware()
    expect(() => { middleware() }).not.toThrow()
  })
})
