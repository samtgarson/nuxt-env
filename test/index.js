import module from '@/index'

jest.mock('@/lib/middleware', () => jest.fn(() => 'middleware result'))

const FakeModule = {
  addServerMiddleware: jest.fn(),
  addPlugin: jest.fn()
}

const subject = module.bind(FakeModule)
const args = {
  keys: ['TEST_ENV']
}

describe('Module', () => {
  it('adds the server middleware', () => {
    subject(args)

    expect(FakeModule.addServerMiddleware)
      .toHaveBeenCalledWith('middleware result')
  })

  it('adds the plugin', () => {
    subject(args)

    expect(FakeModule.addPlugin).toHaveBeenCalled()
    const { calls: { 0: { 0: calls } } } = FakeModule.addPlugin.mock

    expect(calls.filename).toEqual('nuxt-env')
    expect(calls.src).toMatch(/lib\/plugin\.js/)
  })
})
