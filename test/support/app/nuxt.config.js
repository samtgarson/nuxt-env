module.exports = {
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: { NUXT_VAL: 5 },
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
  ]
}
