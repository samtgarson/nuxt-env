module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: { NUXT_VAL: 9 },
  modules: [
    ['@@/index.js', {
      keys: [
        'ENV_1',
        { key: 'ENV_2' },
        { key: 'ENV_3', secret: true },
        { key: 'ENV_4', name: 'MY_ENV' },
        { key: 'ENV_5', default: 'default' }
      ]
    }]
  ],
  nuxtenv: {
    keys: [
      { key: 'ENV_6' },
      { key: 'ENV_7', secret: true },
      { key: 'ENV_8', name: 'MY_TOPLEVEL_ENV' },
      { key: 'ENV_9', default: 'default' }
    ]
  }
}
