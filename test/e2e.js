jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')

const config = require('./support/app/nuxt.config')

const url = path => `http://localhost:${process.env.PORT}${path}`
const get = path => request({
  followRedirect: req => req.headers.location.startsWith('/'),
  resolveWithFullResponse: true,
  simple: false,
  url: url(path)
})

let nuxt

describe('Prod', () => {
  const testValue = 'test_value'

  beforeAll(async () => {
    process.env.TEST_ENV = testValue

    nuxt = new Nuxt({
      ...config,
      modules: [
        ['@@/index.js', {
          keys: ['TEST_ENV']
        }]
      ]
    })

    await new Builder(nuxt).build()
    await nuxt.listen(process.env.PORT)
  })

  afterAll(async () => nuxt.close())

  test('render', async () => {
    const { body } = await get('/')
    return expect(body).toContain(`TEST_ENV: ${testValue}`)
  })
})
