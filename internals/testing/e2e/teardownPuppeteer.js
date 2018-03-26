const os = require('os')
const path = require('path')
const rimraf = require('rimraf')
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

const teardownPuppeteer = async () => {
    await global.__BROWSER__.close() // eslint-disable-line no-underscore-dangle
    rimraf.sync(DIR)
}

module.exports = teardownPuppeteer
