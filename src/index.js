const _ = require('redash')
const args = require('./args')
const config = require('./config')
const command = require('./command')
const services = require('./services')
// const proc = require('./proc')
// const output = require('./output')

const instance = {
  /**
   * @property {number} Timestamp of instance start
   */
  startTS: Date.now(),
  /**
   * Gets config by merging parsed arguments with config object and returns command
   * instructions for instance
   * @returns {object} Command instructions
   */
  getConfig: () => {
    const cfg = _.merge(config.load(args.parse().configPath), args.parse())
    return { services: services.get(cfg), primary: command.get(cfg, 'primary', true) }
  },
  /**
   * Initializes instance from config and args
   */
  start: () => {
    const cfg = instance.getConfig()
    console.log('CFG', JSON.stringify(cfg, null, 2))
    return cfg
    // const svcNames = config.services.reduce((acc, svc) => acc.concat([ svc.name ]), []).join(', ')
    // if (svcNames.length) output.log(`Starting services ${svcNames}`)
    // services.run(cfg.services)
    //   .then(() => {
    //     output.log(`Starting command ${_.last(cfg.primary)}`)
    //     return proc.run(cfg.primary)
    //   })
  }
}

module.exports = instance
