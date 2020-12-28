const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')
const config = require('./support/app/nuxt.config')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const url = path => `http://localhost:${process.env.PORT}${path}`
const get = path => request({
  followRedirect: req => req.headers.location.startsWith('/'),
  resolveWithFullResponse: true,
  simple: false,
  url: url(path)
})

let nuxt

// 5 and 9 are not in the array because we want to test that the "default" value is set
[1, 2, 3, 4, 6, 7, 8].forEach(i => {
  process.env[`ENV_${i}`] = i
})

describe('Prod', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)

    await new Builder(nuxt).build()
    await nuxt.listen(process.env.PORT)
  })

  afterAll(async () => nuxt.close())

  test('render', async () => {
    const { body } = await get('/')

    // We render the server values to the page to validate them
    expect(body).toContain('"serverValues":{"NUXT_VAL":9,"ENV_1":"1","ENV_2":"2","ENV_3":"3","MY_ENV":"4","ENV_5":"default","ENV_6":"6","ENV_7":"7","MY_TOPLEVEL_ENV":"8","ENV_9":"default"')

    // The NUXT_STATE prints out the `app.$env` value
    expect(body).toContain('"env":{"NUXT_VAL":9,"ENV_1":"1","ENV_2":"2","MY_ENV":"4","ENV_5":"default","ENV_6":"6","MY_TOPLEVEL_ENV":"8","ENV_9":"default"}')
  })
})
