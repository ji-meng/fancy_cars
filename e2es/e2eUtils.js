import uuidv4 from 'uuid/v4'

import port from '../server/port'

const testRunId = uuidv4()

let baseUrl
switch (process.env.E2E_TARGET) {
    case 'production':
        baseUrl = 'https://boilerplate.test.com/'
        break
    case 'staging':
        baseUrl = 'https://boilerplate.dev.test.com/'
        break
    case 'local':
    default:
        baseUrl = `http://localhost:${port}/`
}

const getBoilerplateUrlBypassingCloudfrontCache = path =>
    `${baseUrl}${path}?nocache=${testRunId}`

export const getBoilerplateUrl = (path = '') =>
    getBoilerplateUrlBypassingCloudfrontCache(path)
