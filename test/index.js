import module from '@/index'

jest.mock('@/lib/middleware', () => jest.fn(() => 'middleware result'))

const FakeModule = {
  addServerMiddleware: jest.fn(),
  addPlugin: jest.fn(),
  options: {
    nuxtenv: {
      keys: [
        'TOPLEVEL_TEST_ENV'
      ]
    }
  }
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

    expect(calls.fileName).toEqual('nuxt-env.js')
    expect(calls.src).toMatch(/lib\/plugin\.js/)
  })
})
