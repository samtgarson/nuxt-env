import Middleware from '@/lib/middleware'

describe('Middleware', () => {
  it('creates a middleware function', () => {
    const middleware = Middleware()

    expect(middleware).toBeInstanceOf(Function)
  })

  it('adds env to the request', () => {
    const expectedKey = 'TEST_VALUE'
    const expectedValue = 'test value'
    const req = { env: {} }
    const middleware = Middleware([expectedKey])
    process.env[expectedKey] = expectedValue

    middleware(req, {})

    expect(req.env).toHaveProperty(expectedKey, expectedValue)
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
