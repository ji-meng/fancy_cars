import { getBoilerplateUrl } from './e2eUtils'

// Each e2e suite needs its own page, as the suites can run in parallel
let page
beforeAll(async () => {
    page = await browser.newPage()
})

afterAll(async () => {
    await page.close()
})

describe('Health Check', () => {
    test('React starts successfully', async () => {
        await page.goto(getBoilerplateUrl())

        // This id is loaded by the AppWrapper component. This component is always
        //   loaded if the app is able to render. This test simply makes sure that
        //   React is able to load
        await page.waitFor('#react-app-wrapper')
    })
})
