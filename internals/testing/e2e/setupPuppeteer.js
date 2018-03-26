const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

const puppeteerOptions = { headless: true }

if (process.env.CI) {
    puppeteerOptions.executablePath = 'google-chrome-unstable'
}

const setupPuppeteer = async () => {
    const browser = await puppeteer.launch(puppeteerOptions)
    global.__BROWSER__ = browser // eslint-disable-line no-underscore-dangle
    mkdirp.sync(DIR)
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}

module.exports = setupPuppeteer
